export class CreatePensionRequestModel {
    withdrawalAmmount: number;
    beginingBalance: number;
    currentyearContribution: number;
    vestingPercent: number;
    lastRoundWithdrawal: number;
    proratedNewContribution: number;
    currentAvailableBalance: number;
    maxWithdrawalAmount: number;
    yearsOfService: number;
    requestedById: number;
    requestedOn: Date;
    isActive: boolean;
    isApproved: boolean;
    approvedOn: Date;
    rejectedOn: Date;
    isEligible: boolean;
    isEnrolled: boolean;
}