import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css'],
})
export class ServerComponent implements OnInit {
  server: { id: number; name: string; status: string };
  sub: any;
  qrParams: any;
  allowEdit = false;

  constructor(
    private serversService: ServersService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    //Alternative
    /*this.server = this.serversService.getServer(
      Number(this.activatedRoute.snapshot.params['id'])
    );*/

    this.sub = this.activatedRoute.params.subscribe((params) => {
      this.server = this.serversService.getServer(Number(params['id']));
    });

    this.qrParams = this.activatedRoute.queryParams.subscribe((qrParams) => {
      this.allowEdit = qrParams['allowEdit'] === '1' ? true : false;
      //console.log(this.allowEdit);
    });
  }
  onEditServer() {
    //Nous pouvons utiliser ça
    //this.router.navigate(['servers', this.server.id, 'edit']);

    //mais tant qu'on est déja sur la page /servers/this.server.id on utilisera plus
    //this.router.navigate(['edit'], { relativeTo: this.activatedRoute });

    //De plus, quand on veut garder les queryParams, on met queryParamsHandling:'preserve'
    this.router.navigate(['edit'], {
      relativeTo: this.activatedRoute,
      queryParamsHandling: 'preserve',
    });
  }
}
