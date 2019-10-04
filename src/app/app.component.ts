import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {FormControl} from '@angular/forms';
import {  Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { debounceTime } from 'rxjs/operators/debounceTime';
import { delay } from 'rxjs/operators/delay';
import { switchMap } from 'rxjs/operators/switchMap';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  math = Math;
  title = 'app';
  searchResults: any = [];
  searchValue: any = '';
  predictionData: any;
  pastData: any;
  formCtrl$: Subscription;
  calculatedCosts = [];
  searchControl = new FormControl();

constructor(private http: HttpClient) { }

getPastData(selectedPredection) {
  this.searchValue = '';
  this.searchResults = [];
  selectedPredection['net_paid_amt_for_rx_claims'] = selectedPredection['net_paid_amt_for_rx_claims'] * 4;
  selectedPredection['pot_cd_23'] = selectedPredection['pot_cd_23'] * 4;
  selectedPredection['pot_cd_41'] = selectedPredection['pot_cd_41'] * 4;
  selectedPredection['pot_cd_81'] = selectedPredection['pot_cd_81'] * 4;

  this.calculateOOP(selectedPredection);
  this.predictionData = selectedPredection;
  console.log(this.predictionData);
  this.http.get("https://api.mlab.com/api/1/databases/humana/collections/past_data?q={'members_id':'"+selectedPredection.members_id+"'}&apiKey=SH5V21C8t4wse4ycSXnHyTEOXMpDmcvg")
    .pipe(
      delay(100)
    ).subscribe((data) => {
      this.pastData = data;
  });
}

async calculateOOP(predictionData) {
  let plans = [{
    planId: "H5521 - 099 - 000",
    planName: "Aetna Medicare Value Plan (PPO)",
    parent: "Aetna Inc.",
    cost: {
        lab: 5,
        ed: 90,
        ambulance: 265
    }
}, {
    planId: "H2228 - 019 - 000",
    planName: "AARP MedicareComplete Choice (PPO)",
    parent: "UnitedHealth Group, Inc.",
    cost: {
        lab: 5,
        ed: 90,
        ambulance: 250
    }
}, {
    planId: "H6348 - 002 - 000",
    planName: "Allwell Medicare (PPO)",
    parent: "Centene Corporation",
    cost: {
        lab: 5,
        ed: 90,
        ambulance: 295
    }
}, {
    planId: "H7220 - 002 - 000",
    planName: "IU Health Plans Medicare Select (HMO)",
    parent: "Indiana University Health",
    cost: {
        lab: 10,
        ed: 90,
        ambulance: 275
    }
}];

await plans.forEach(p => {
    p['outOfPocket'] = Math.floor((predictionData.pot_cd_23 * p.cost.ed +
    predictionData.pot_cd_81 * p.cost.lab +
    predictionData.pot_cd_41 * p.cost.ambulance + predictionData.net_paid_amt_for_rx_claims))
  });
  plans = plans.sort((a, b) => (a['outOfPocket'] > b['outOfPocket']) ? 1 : -1);
  this.calculatedCosts = plans;
}

  ngOnInit() {
    // Using Reactive Forms
    this.searchControl.valueChanges
    .pipe(
    debounceTime(1000),
    switchMap(inputVal => this.http.get("https://api.mlab.com/api/1/databases/humana/collections/prediction_data?q={'members_id':{'$regex': '"+inputVal+"'}}&l=5&apiKey=SH5V21C8t4wse4ycSXnHyTEOXMpDmcvg"))
    )
    .subscribe(data => {
      this.searchResults = [];
      this.searchResults = data;
    });

  }
}


