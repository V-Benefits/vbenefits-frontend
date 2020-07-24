export class SimCardRequestModel {
    requestFor: string;
    requestType: string;
    band: string;
    ratePlan: string;
}

export class EligableRatePlanModel {
    staffId: number;
    band: string;
    ratePlan: string;
    numberOfUsedLines: number;
}