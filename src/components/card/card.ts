import { Component, Input } from '@angular/core';

import { Product } from '../../pages/product-list/product-list';//импорт карточек

@Component({

  selector: 'card',

  templateUrl: 'card.html'

})

export class CardComponent {

  @Input() product: Product;

}
