export class PensionRequestModel{

    id: number;
    name: string;
    staffId: number;
    currentyearContribution: number;
    beginingBalance: number;
    availableBalance: number;
    withdrawalAmmount: number;
    vestingPercent: number;
    vestedBalance: number;
    lastRoundWithdrawal: number;
    proratedNewContribution: number;
    currentAvailableBalance: number;
    maxWithdrawalAmount: number;
    income: number;
    Band: number;
    isEligible:number;
    costCenter:string;
    tenure: string;
    subBand: string;
    hiringDate: Date;
    requestedById: number;
    requestedOn:Date;
    isActive:boolean;
    isApproved: boolean;
    approvedOn: Date;
    rejectedOn:Date;
    status: string;
}