import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';

import { Client, Room }  from 'colyseus.js';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page implements OnInit {

  @ViewChild("game")
  private gameCanvas: ElementRef;

  private context: any;
  private chatRoom: Room;
  private bgcolour: string =  '#FFFFFF';

  constructor(private auth: AuthService) {}
  
  public ngOnInit() {
    const host = window.document.location.host.replace(/:.*/, '');
    //const port = location.port ? ':' + location.port : '';
    const port = ':2567';

    const protocol = location.protocol.replace('http', 'ws');
    const client = new Client(protocol + host + port + '/ws');
    this.chatRoom = client.join('state_handler', {channel: 'Default'});


    this.chatRoom.onStateChange.addOnce((state) => { 
      //(this.messages = messages);
      let players = state.players;
      let keys = Object.keys(players);
      if (players) {
        keys.forEach(p => {
            if (players[p]._schema) {
              this.redraw(players[p]);
            }
        });
     /*    players.forEach(player => {
          this.redraw(player);
         });*/
      }
      this.noop();

    });


    this.chatRoom.onStateChange.add((state) => { 
      //(this.messages = messages);
      let players = state.players;
      if (players) {
       /*  players.forEach(player => {
          this.redraw(player);
         }); */ 
      }

    });
    

    

    this.chatRoom.onMessage.add(player => {
        this.redraw(player);
        console.log('message:' + player);
      });
    } 

  public ngAfterViewInit()
  {
      this.context = this.gameCanvas.nativeElement.getContext("2d");

      this.chatRoom.onJoin.add(() => {
        this.chatRoom.state.players.onChange = (player) => {
            this.redraw(player);     
        };

      });

      window.addEventListener("keydown", e => {
        console.log(e.which);
        if (e.which === 38) {
          this.up();

        } else if (e.which === 39) {
          this.right();

        } else if (e.which === 40) {
          this.down();

        } else if (e.which === 37) {
          this.left();
        }
      });

    
  }


  noop () {
    this.chatRoom.send({});
  }

  up () {
    this.chatRoom.send({ y: -1 });
  }

  right () {
    this.chatRoom.send({ x: 1 });
  } 
  down () {
    this.chatRoom.send({ y: 1 })
  }

  left () {
    this.chatRoom.send({ x: -1 })
  }

 redraw(player) {
   console.log('prevx:' + player.prevx + ' prevy:' +  player.prevy + 'x:' + player.x + ' y:' +  player.y);
  this.context.fillStyle = this.bgcolour;
  this.context.fillRect(player.prevx, player.prevy, 30, 30);
  this.context.fillStyle = player.colour;
  this.context.fillRect(player.x, player.y, 30, 30);
 }

}
