import { Component, OnInit } from '@angular/core';
import { publicService } from 'src/app/core/publicService.service';
import { RoundModel } from '../pensionRequestModels';

@Component({
  selector: 'app-pension-request-view',
  templateUrl: './pension-request-view.component.html',
  styleUrls: ['./pension-request-view.component.css']
})
export class PensionRequestViewComponent implements OnInit {
  rounds:RoundModel[];

  constructor( private service: publicService) { }

  ngOnInit(): void {
  }

  getAllRounds(){
    // this.service.getAll('RoundDate').subscribe( res =>
    //   this.rounds = res)
  }
}
