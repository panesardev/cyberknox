import { Component } from '@angular/core';
import { API_URL } from '../../app.constants';

@Component({
  selector: 'app-index',
  standalone: true,
  imports: [],
  templateUrl: './index.component.html',
})
export default class IndexComponent {

  ngOnInit(): void {
    console.log(API_URL);
  }

}
