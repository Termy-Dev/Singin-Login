import { Component, OnInit, ViewChild } from '@angular/core';
import { countable, FeedsService, RootObject } from '../service/feeds.service';
import { IonInfiniteScroll } from '@ionic/angular';


interface RefresherEventDetail {
  complete(): void;
}

interface RefresherCustomEvent extends CustomEvent {
  detail: RefresherEventDetail;
  target: HTMLIonRefresherElement;
}


interface InfiniteScrollCustomEvent extends CustomEvent {
  target: HTMLIonInfiniteScrollElement;
}


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit {
  @ViewChild(IonInfiniteScroll) infiniteScroll: IonInfiniteScroll;

  feeds: RootObject[];
  
  defautOptios: countable = {
    skip: 0,
    limit: 5
  }

  currentSkip: number = 0 ;

  constructor(private ServiceFeeds : FeedsService) {}

  async ngOnInit(){
     this.feeds = await this.ServiceFeeds.getFeeds(this.defautOptios);
  }


  async doRefresh(event:RefresherCustomEvent){
    this.feeds= [];
    this.feeds = await this.ServiceFeeds.getFeeds(this.defautOptios);
    this.currentSkip = 0 ;
    event.target.complete();
  }


  async loadData(event: InfiniteScrollCustomEvent) {
   
    this.currentSkip = this.currentSkip + this.defautOptios.limit;

    const newFeeds = await this.ServiceFeeds.getFeeds({
      skip: this.currentSkip,
      limit: this.defautOptios.limit
    });

    this.feeds = [...this.feeds, ...newFeeds]
   
    event.target.complete();
  }



}
