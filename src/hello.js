import {Inject, Component, View, bootstrap, If, For} from 'angular2/angular2';

function FriendsService() {
  this.names = ["Alice", "Aarav", "Martín", "Shannon", "Ariana", "Kai"];
  this.add = function (name) {
    this.names.push(name);
  };
}

@View({
  template: `
    <p>My name: {{ myName }}</p>
    <p>Friends:</p>
    <ul>
      <li *for="#name of names">
        {{ name }}
      </li>
    </ul>
    <p *if="names.length > 3">You have many friends!</p>
    <input #friendtext type="text" (keyup)="doneTyping($event)">
    <button (click)="addFriend(friendtext.value)">Add Todo</button>
  `,
  directives: [For, If]
})
@Component({
  selector: "display",
  injectables: [FriendsService]
})
export class DisplayComponent {
  constructor(friends) {
    this.myName = "Alice";
    this.names = friends.names;
    this.friends = friends;
  }

  doneTyping ($event) {
    if ($event.which === 13) {
      this.addFriend($event.target.value);
      $event.target.value = null;
    }
  }

  addFriend (name) {
    this.friends.add(name);
  }
}

DisplayComponent.parameters = [[FriendsService]];

bootstrap(DisplayComponent);

