import { ImageMarkerOptions } from "leaflet";
import { ComponentProps, FC } from "react";
import Ark from "./Ark";
import FruitTree from "./FruitTree";
import Shed from "./Shed";
import Stair from "./Stair";

interface Category {
    Options: ImageMarkerOptions
    Icon: FC<ComponentProps<'img'>>
}

const categories: Record<FeatureCategory, Category> = {
    FruitTree,
    Ark,
    Stair,
    Shed,
    'ConiferousTree': FruitTree,
    'DeciduousTree': FruitTree,
    'Shrubbery': FruitTree,
    'MonitoringWell': FruitTree,
    'Hydrant': FruitTree,
    'Fountain': FruitTree,
    'Tap': FruitTree,
    'Well': FruitTree,
    'HighVoltageTransmitter': FruitTree,
    'Transformer': FruitTree,
    'TVmast': FruitTree,
    'ElectricPole': FruitTree,
    'Unknown1': FruitTree,
    'Unknown2': FruitTree,
    'Unknown3': FruitTree,
    'GasPipe': FruitTree,
    'PowerCord': FruitTree,
    'Sewage': FruitTree,
    'WaterPipe': FruitTree,
    'Communication': FruitTree,
    'CadastralBorder': FruitTree,
    'ContiguousCadastralBoundaries': FruitTree,
    'LivingFence': FruitTree,
    'Railway': FruitTree,
    'ConcreteFence': FruitTree,
    'Easement': FruitTree,
    'MetalFence': FruitTree,
    'WoodenFence': FruitTree,
    'RetainingWall': FruitTree,
    'Curbside': FruitTree,
    'RoadOutline': FruitTree,
    'Flat': FruitTree,
    'Pipe': FruitTree,
    'Building': FruitTree,
    'Isohypse': FruitTree,
    'MainIsohypse': FruitTree
}

export default categories