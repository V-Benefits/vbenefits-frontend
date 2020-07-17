export class SimCardRequestModel {
    requestFor: string;
    requestType: string;
    band: string;
    ratePlan: string;
}

export class EligableRatePlanModel {
    band: string;
    ratePlan: string;
    numberOfUsedLines: number;
}