export class CreateProfileInformationModel {

    Id: number;
    StaffId: string;
    DateOfBirth: Date;
    NationalId: string;
    MobileNumber: string;
    LandlineNumber: string;
}

export class PhoneProgramRequestModel
{
    RequestFor: string;
    RequestById: number;
    RequestDate: Date;
}