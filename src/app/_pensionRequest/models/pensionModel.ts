export class CreatePensionRequestModel {
    withdrawalAmmount: number;
    BeginingBalance: number;
    CurrentyearContribution: number;
    VestingPercent: number;
    LastRoundWithdrawal: number;
    ProratedNewContribution: number;
    CurrentAvailableBalance: number;
    MaxWithdrawalAmount: number;
    YearsOfService: number;
    RequestedById: number;
    RequestedOn: Date;
    isActive: boolean;
    isApproved: boolean;
    ApprovedOn: Date;
    RejectedOn: Date;

}