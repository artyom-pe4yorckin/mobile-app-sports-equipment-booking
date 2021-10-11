import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductDetailsPage } from '../product-details/product-details';

@Component({
  selector: 'product-list',
  templateUrl: 'product-list.html'
})
export class ProductListPage {
  Object = Object;
  products: Product[];
  productType: {
    any: string,
    equestrian: string,
    shooting: string,
    water: string,
    combats: string,
    ski: string,
    skating: string,
    football: string,
    tennis: string,
    rugby: string
  };
  productSeason: {
    any: string,
    summer: string,
    autumn: string,
    winter: string,
    spring: string
  };
  filteredProducts: Product[];
  filterVal: {
    type: string,
    season: string,
    availability: Boolean,
    price: {min: string, max: string}
  };

  constructor(public navCtrl: NavController) {
    //значения фильтров
    this.filterVal = {
      type: 'any',
      season: 'any',
      availability: false,//т.е. показывать все товары независимо от доступности
      price: {min: '0', max: 'Infinity'}
    };
    this.productType = {
      any: 'любой',
      equestrian: 'конный',
      shooting: 'стрелковый',
      water: 'водный',
      combats: 'единоборства',
      ski: 'лыжный',
      skating: 'коньковый',
      football: 'футбол',
      tennis: 'тенис',
      rugby: 'регби'
    };
    this.productSeason = {
      any: 'любой',
      summer: 'лето',
      autumn: 'осень',
      winter: 'зима',
      spring: 'весна'
    };
    this.products = [
      {
        title: 'лыжи',
        type: 'ski',
        season: ['winter'],
        img: 'https://pngimg.com/uploads/skiing/skiing_PNG30.png',
        availability: true,
        price: 100
      },
      {
        title: 'коньки',
        type: 'skating',
        season: ['winter'],
        img: 'https://pngimg.com/uploads/ice_skates/ice_skates_PNG48.png',
        availability: true,
        price: 100
      },
      {
        title: 'акваланг',
        type: 'water',
        season: ['summer'],
        img: 'https://spb.skupka.tv/wp-content/uploads/2019/08/prodat-akvalang.png',
        availability: false,
        price: 500
      },
      {
        title: 'щитки',
        type: 'combats',
        season: ['spring', 'summer', 'autumn'],
        img: 'https://jogel.pro/upload/resize_cache/iblock/525/655_428_0/525815b9d5d4dac987abbd2459b9cfb0.png',
        availability: true,
        price: 200
      },
      {
        title: 'мяч для регби',
        type: 'rugby',
        season: ['summer'],
        img: 'https://s.alicdn.com/@sc04/kf/H6e7bf2ab1da04407a622e459cb3ee061B.jpg_300x300.jpg',
        availability: true,
        price: 250
      }
    ];
    //отфильтрованные продукты
    this.filteredProducts = [...this.products].filter(this.filerProducts.bind(this));
  }

  /**
   * переход на страницу с подробной информацией о товаре
   * @param {Product} prod - объект с инфо о товаре
   */
  openProduct(prod: Product): void {
    this.navCtrl.push(ProductDetailsPage, {
      //передаём данные на страницу
      currentProduct: prod,
      productType: this.productType,
      productSeason: this.productSeason
    });
  }

  /**
   * фильтрация товаров
   * @param {Product} product - объект с инфо о товаре
   * @returns {boolean}
   */
  filerProducts(product: Product): boolean {
    //определяем какие фильтры акттивны
    let activeFilter = [];
    for (let filter in this.filterVal) {
      if (this.filterVal[filter]
        && this.filterVal[filter] != 'any'
        && (this.filterVal[filter].min != '0'
          || this.filterVal[filter].max
          != 'Infinity')) {
        activeFilter.push(filter);
      }
    }
    //проверяем на соответствие фильтрам
    for (let prop of activeFilter) {
      if (prop == 'season') {
        if (!product[prop].includes(this.filterVal[prop])) {
          return false;
        }
      } else if (prop == 'price') {
        if (product[prop] < +this.filterVal[prop].min || product[prop] > +this.filterVal[prop].max) {
          return false;
        }
      } else if (product[prop] != this.filterVal[prop]) {
        return false;
      }
    }
    return true;
  }

  /**
   * изменение списка отфильтрованных товаров
   */
  changeFilterVal(): void {
    if (this.filterVal.price.min == '') {
      this.filterVal.price.min = '0';
    }
    if (this.filterVal.price.max == '') {
      this.filterVal.price.max = 'Infinity';
    }
    this.filteredProducts = [...this.products].filter(this.filerProducts.bind(this));
  }
}

export interface Product {
  title: string,
  type: string,
  season: string[],
  img: string,
  availability: boolean,
  price: number
}
