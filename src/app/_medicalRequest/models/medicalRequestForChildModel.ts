import { ImageModel } from './imageModel';

export class MedicalRequestForChildModel {
    staffId?: string;
    childName?: string;
    childImage?: string;
    birthCertificate?: string;
}

export class ChildImageModel {
    childPersonalImage: ImageModel = new ImageModel();
    childBirthCertificateImage: ImageModel = new ImageModel();
}