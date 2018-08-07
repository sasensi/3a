import { EventModel } from './event.model';
import { ImageModel } from './image.model';

export interface DatasModel
{
    images: ImageModel[]
    events: EventModel[]
    about: string
}