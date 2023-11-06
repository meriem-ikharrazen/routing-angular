import {
  Component,
  DoCheck,
  OnChanges,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit, OnDestroy {
  user: { id: number; name: string };
  sub: any;

  constructor(private activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    /*this.user = {
      id: this.activatedRoute.snapshot.params['id'],
      name: this.activatedRoute.snapshot.params['name'],
    };*/
    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.user = {
        id: params['id'],
        name: params['name'],
      };
    });
  }
  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
