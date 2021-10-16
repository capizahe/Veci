import { DOCUMENT } from '@angular/common';
import { Component, Inject, Input, OnInit } from '@angular/core';
import { FilterObject } from 'src/app/model/filter-object';
import { ModalController, NavParams } from '@ionic/angular';



@Component({
  selector: 'app-filter',
  templateUrl: './filter.page.html',
  styleUrls: ['./filter.page.scss'],
})
export class FilterPage implements OnInit {

  @Input() filterObjects: FilterObject[];

  optionselectedStatus = [];

  dataLoaded = false;

  constructor(@Inject(DOCUMENT) document, public modalController: ModalController) {

  }

  /**
   * Se carga el arreglo optionselectedStatus con la misma cantidad de campos que en las opciones por cada categoria
   * para mantener un indicador del estado del campo seleccionado = verdadero/falso
   */
  ngOnInit(): void {
    if (!this.dataLoaded) {
      this.filterObjects.forEach((element, index) => {
        this.optionselectedStatus[index] = new Array(element.options.length).fill(false);
      });
      this.dataLoaded = true;
    }
  }

  /**
   *Si se seleciona la opcion la agrega en el arrego optionselectedStatus como verdadero
   *en caso de que ya se encuentre selecionado lo marca como falso
   *
   * @param i
   * @param j
   */
  optionSelected(i, j) {

    if (this.optionselectedStatus[i][j] === false) {
      this.optionselectedStatus[i][j] = true;
    } else {
      this.optionselectedStatus[i][j] = false;
    }
  }

  /**
   * En caso de que el elemento este seleccionado cambia el color a verde y retorna true para
   * que el icono del check se muestre
   *
   * @param i indice de categoria
   * @param j indice de elemento de categoria
   * @returns boolean
   */
  isSelected(i, j) {

    const id = i + '' + j;

    if (this.optionselectedStatus[i][j]) {
      document.getElementById(id).style.color = 'var(--ion-color-success)';
      return true;
    } else {
      document.getElementById(id).style.color = '#000000';
      return false;
    }
  }

  /**
   * Retorna el objeto de respuesta a la clase que lo invocó
   */
  async returnFilterInput() {

    const filteredObjectResponse: FilterObject[] = [];

    await this.optionselectedStatus.forEach(async (element, i) => {

      const responses = [];

      const filterObject = new FilterObject(this.filterObjects[i].name, responses);

      await element.forEach((selected, j) => {
        if (selected) {
          responses.push(this.filterObjects[i].options[j]);
        }
      });

      filteredObjectResponse.push(filterObject);

    });

    console.log(filteredObjectResponse);

    this.modalController.dismiss({ filteredObjectResponse });
  }
}
