import { Component } from '@angular/core';

import { Client, Room }  from 'colyseus.js';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss']
})
export class Tab2Page {

  messages: string[] = [];
  text = new FormControl('');
  private chatRoom: Room;
  intext: string = 'xxx';

  constructor() {}

  ngOnInit(): void {
    const host = window.document.location.host.replace(/:.*/, '');
    //const port = location.port ? ':' + location.port : '';
    const port = ':2567';

    const protocol = location.protocol.replace('http', 'ws');
    const client = new Client(protocol + host + port + '/ws');
    this.chatRoom = client.join('chat', {channel: 'Default'});
    this.chatRoom.onStateChange.add(({messages}) => { 
      (this.messages = messages);
      console.log('messages:' + messages);
    });

    this.chatRoom.onMessage.add(data => {
       this.messages.push(data);
       console.log('message:' + data);
    });
  }

  send() {
    console.log('message:' + this.intext);
    this.chatRoom.send({ message: this.intext});
    this.intext = '';
    //this.text.setValue('');
  }


}
