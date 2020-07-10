import { ImageModel } from './imageModel';

export class MedicalRequestModel {
    staffId: number
    personalImage: string
    spouseName: string
    spouseImage: string
    marrigeCertificate: string
    childrenNumber: number
    requestType: string
    childrenInfoDTOs: MedicalRequestForChildModel[]
}

export class MedicalRequestForChildModel {
    childName?: string;
    childImage?: string;
    birthCertificate?: string;
}

export class ChildImageModel {
    childPersonalImage: ImageModel = new ImageModel();
    childBirthCertificateImage: ImageModel = new ImageModel();
}