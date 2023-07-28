import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons"
import { Button, Table, TableProps, Upload, UploadFile } from "antd"
import { RcFile, UploadChangeParam } from "antd/es/upload"
import { FC, useState } from "react"

interface PointsTableProps {
    readOnly?: boolean,
    value?: Point[],
    onChange?: (event: { target: { value: Point[] | undefined } }) => void
}

const PointsTable: FC<PointsTableProps> = ({ value: defaultValue, readOnly, onChange }) => {
    const [ value, setValue ] = useState<Point[] | undefined>(defaultValue)

    const handleRemove = (record: Point) => setValue((oldValue) => oldValue?.filter(x => x !== record)) 

    const handleImport = async ({ file }: UploadChangeParam<UploadFile>) => {
        const text = await (file as RcFile).text(),
            filename = file.name.substring(0, file.name.lastIndexOf('.'))

        const data: Point[] = text.split('\n').map(x => x.split(',').map(y => parseFloat(y)).filter(y => !isNaN(y))).filter(x => x.length > 0).map(p => ({
            x: p[0],
            y: p[1],
            z: p[2],
            group: filename
        }))

        setValue(data)

        if(onChange) {
            onChange({ target: { value: data }})
        }

        return false
    }

    const columns: TableProps<Point>['columns'] = [
        {
            title: '#',
            dataIndex: 'key',
            rowScope: 'row',
            width: 40,
            render: (_, r) => value && value.indexOf(r) + 1
        },
        {
            key: 'x',
            dataIndex: 'x',
            title: 'X',
        },
        {
            key: 'y',
            dataIndex: 'y',
            title: 'Y',
        },
        {
            key: 'z',
            dataIndex: 'z',
            title: 'Z',
        },
        {
            key: 'actions',
            dataIndex: 'actions',
            title: '',
            width: 40,
            fixed: 'right',
            render: (_, r) => (
                <Button type="link" onClick={() => handleRemove(r)} style={{ padding: 0 }}>
                    <MinusCircleOutlined style={{ color: '#f00' }} />
                </Button>
            )
        }
    ]

    return (
        <>
            {!readOnly && (
                <div style={{ float: 'right', marginTop: '-40px' }}>
                    <Upload showUploadList={false} multiple={false} maxCount={1} onChange={handleImport} beforeUpload={() => false} accept=".txt">
                        <Button type='link' block icon={<PlusOutlined />} />
                    </Upload>
                </div>
            )}
            <Table columns={columns} dataSource={value} rowKey={(_, i = 0) => i} size="small" pagination={false} scroll={{ x: 380, y: value && value.length > 6 ? 300 : undefined }} />
        </>
    )
}

export default PointsTable