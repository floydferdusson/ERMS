@ -0,0 +1,344 @@
<script setup>

import {computed, onBeforeMount, ref} from "vue";
import {useLoginStore} from "stores/LoginStore";
import {usePersonalDataStore} from "stores/f/PersonalDataStore";
import { createDate } from "../f-utils";
import {server} from "boot/axios";

const maxPerPage = 42
const maxExtra = {
  children: maxPerPage + 1,
  education: maxPerPage,
  eligibilities: maxPerPage,
  experiences: maxPerPage,
  volunteerings: maxPerPage,
  interventions: maxPerPage,
  otherInfo: maxPerPage,
}
const state = usePersonalDataStore()
const store = useLoginStore();
const [ user ] = store.userinfo.slice()
const max = {
  children: 12,
  education: 5,
  eligibilities: 10,
  experiences: 28,
  volunteerings: 7,
  interventions: 21,
  otherInfo: 7,
  references: 3,
}

function formatMoney (number) {
  const formatter = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: 2, // Always show two decimal places
    maximumFractionDigits: 2, // Enforce maximum of two decimal places
  });
  return formatter.format(number);
}
const [ mainChildren, extraChildren ] = state.children
const [ mainEducation, extraEducation ] = state.education
const [ mainEligibilities, extraEligibilities ] = state.eligibilities
const [ mainVolunteerings, extraVolunteerings ] = state.volunteerings
const [ mainInterventions, extraInterventions ] = state.trainings

const idImageUrl = computed(() => {
  return store.pics? `${server}/Pics/${store.img}`: null;
})

const pageCount = ref(['1', '2', '3', '4'])
onBeforeMount( async () => {
  await state.getWorkExperiences(() => {})
  extractExtensions();
})

function extractExtensions () {
  const { Surname, SpouseName, FatherName } = user;
  if (Surname.includes(',')) {
    [ user.Surname, user.NameExt ] = user.Surname.split(',');
    [ user.SpouseName, user.SpouseNameExt ] = user.SpouseName.split(',');
    [ user.FatherName, user.FatherNameExt ] = user.FatherName.split(',');
  }
}

function measure (text, len = 120, otherlen = 140) {
  if (text.length > otherlen) return '6.5';
  if (text.length > len) return '8';
  else return '10'
}


</script>

<template>
  <div id="contentPersonalData" class="floyd row justify-start items-start q-pa-sm">

    <div class="col-12 row q-px-md" style="aspect-ratio: 1/1.52"> <!-- region PAGE 1 -->
      <div class="col-12 row no-wrap text-weight-bold q-pt-none">
        <div class="col-2 column no-wrap text-italic" style="line-height: 1.1em">
          <div>CS Form No. 212</div><div>Revised 2017</div>
        </div>
        <div class="col-grow row no-wrap flex-center text-center" style="font-size: x-large">
          PERSONAL DATA SHEET
        </div>
        <div class="col-2"/>
      </div>
      <div class="col-12 column no-wrap q-pt-xs">
        <div class="col ellipsis text-weight-bold text-italic" style="font-size: 0.97em">
          WARNING: Any misrepresentation made in the Personal Data Sheet and the Work Experience Sheet shall cause the
          filing of administrative/criminal case/s against the person concerned.
        </div>
        <div class="col text-weight-bold text-italic">
          READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET (PDS) BEFORE ACCOMPLISHING THE PDS FORM.
        </div>
        <div class="col row no-wrap">
          <div class="col-shrink">Print legibly. Tick appropriate boxes (</div>
          <div class="col-shrink"><q-icon name="img:/f/check_box_outline_blank_24dp.png"/></div>
          <div class="col-shrink">) and use separate sheet if necessary. Indicate N/A if not applicable.</div>
          <div class="col-shrink text-weight-bold q-pr-xs">DO NOT ABBREVIATE</div>
          <div class="col-shrink border-black bg-grey-6 q-px-xs">1. CS ID No.</div>
          <div class="col-grow border-black q-px-xs text-right" style="font-size: xx-small">
            (Do not fill up. For CSC use only)
          </div>
        </div>
      </div>

      <q-separator class="col-12 bg-black q-pt-xs"/>

      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">I. PERSONAL INFORMATION</div>
      <div class="col-12 row no-wrap"> <!-- region COLUMN 2 -->
        <!-- Labels -->
        <div class="col-1 row no-wrap label-max-width border-black bg-grey-5">
          <div class="col-2 column no-wrap q-px-sm">
            <div class="col-shrink label-max-height row items-center text-right">2.</div>
          </div>
          <div class="col-grow row">
            <div v-for="n in ['SURNAME', 'FIRST NAME', 'MIDDLE NAME']" :key="`nameLabel${n}`" class="col-12 text-left row items-center label-max-height">{{n}}</div>
          </div>
        </div>
        <!-- Fields -->
        <div class="col-grow row">
          <div class="col-12 border-black label-max-height f-field q-pl-sm text-uppercase">{{ user['Surname'] }}</div>
          <div class="col-12 row no-wrap">
            <div class="col-8 border-black label-max-height f-field q-pl-sm text-uppercase">{{ user['Firstname'] }}</div>
            <!-- TODO implement databinding -->
            <div class="col-grow border-black label-max-height q-pl-xs bg-grey-5 column">
              <div class="col">NAME EXTENSION (JR, SR)</div>
              <div class="col">{{ (user['Sex'] === 'MALE')? (user['NameExt'] ?? 'NONE'): 'N/A' }}</div>
            </div>
          </div>
          <div class="col-12 border-black label-max-height f-field q-pl-sm text-uppercase">{{ user['MIddlename'] }}</div>
        </div>
      </div><!-- endregion COLUMN 2 -->

      <div class="col-12 row">
        <div class="col-5 row">
          <div class="col-grow column no-wrap">

            <div class="col-shrink row no-wrap label-max-height">
              <div class="row no-wrap items-start content-start border-black bg-grey-5 label-max-width">
                <div class="col-shrink text-right q-pl-sm ">3.</div>
                <div class="col-grow column no-wrap text-left q-pl-sm" style="padding-top: 0.3em; line-height: 0.8em">
                  <div>DATE OF BIRTH</div><div>(mm/dd/yyyy)</div>
                </div>
              </div>
              <div class="col-grow border-black f-field q-pl-sm">{{ createDate(user['Bday']).str }}</div>

            </div> <!-- COLUMN 3 -->


            <div class="col-grow row no-wrap">
              <div class="row no-wrap items-start content-start border-black bg-grey-5 label-max-width">
                <div class="col-shrink text-right q-pl-sm ">4.</div>
                <div class="col-grow text-left q-pl-sm">PLACE OF BIRTH</div>
              </div>
              <div class="col column no-wrap border-black q-pl-sm text-uppercase" style="padding-top: 0.3em; line-height: 0.8em">
                <div>{{ user['BirthPlace'] }}</div>
              </div>
            </div> <!-- COLUMN 4 -->


            <div class="col-shrink row no-wrap label-max-height">
              <div class="row no-wrap items-start content-start border-black bg-grey-5 label-max-width">
                <div class="col-shrink text-right q-pl-sm ">5.</div>
                <div class="col-grow text-left q-pl-sm">SEX</div>
              </div>
              <div class="col-grow border-black row no-wrap items-start q-pl-sm">
                <q-checkbox class="col" size="sm" color="black" label="Male" dense
                            checked-icon="img:/f/check_box_24dp.png"
                            unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                            :model-value="user['Sex'] === 'MALE'" />
                <q-checkbox class="col" size="sm" color="black" label="Female" dense
                            checked-icon="img:/f/check_box_24dp.png"
                            unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                            :model-value="user['Sex'] !== 'MALE'" />
              </div>
            </div> <!-- COLUMN 5 -->

          </div>
        </div> <!-- COLUMNS 3, 4, 5 -->
        <div class="col-7 row">
          <div class="col-5 column no-wrap justify-between bg-grey-5 border-black" style="min-width: 180px">
            <div class="row no-wrap bg-grey-5 q-pt-none">
              <div class="col-shrink text-right q-pl-sm ">16.</div>
              <div class="col-grow text-left q-pl-sm">CITIZENSHIP</div>
            </div>
            <div class="q-mx-md q-pb-xs text-center f-multiline">If holder of dual citizenship,<br/>please indicate the details.</div>
          </div>
          <div class="col column no-wrap border-black">
            <div class="col-shrink row q-pl-xs">
              <div class="col-12 row no-wrap">
                <q-checkbox class="col-3" size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                            :model-value="user['Citizenship'] === 'FILIPINO'" label="Filipino" />
                <q-checkbox class="col" size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                            :model-value="user['Citizenship'] !== 'FILIPINO'" label="Dual Citizenship" />
              </div>
              <div class="col-12 row no-wrap reverse"> <!-- TODO: implement proper data binding -->
                <q-checkbox class="col-5" size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                            :model-value="user['Citizenship'] !== 'FILIPINO' && !!user['citizenshipStatus']" label="by naturalization" />
                <q-checkbox class="col-4" size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                            :model-value="user['Citizenship'] !== 'FILIPINO' && !user['citizenshipStatus']" label="by birth" />
              </div>
            </div>
            <div class="col-shrink q-pl-sm q-py-xs">Pls. indicate country:</div>
            <div class="col-grow border-black q-pl-sm label-max-height text-uppercase">{{ user['country'] === '0' ? 'N/A': user['country'] }}</div>
          </div>
        </div> <!-- COLUMN 16 -->


        <div class="col-12" />


        <div class="col-5 row">
          <div class="col-grow column no-wrap">

            <div class="col row no-wrap">
              <div class="row no-wrap border-black bg-grey-5 label-max-width">
                <div class="col-shrink text-right q-pl-sm">6.</div>
                <div class="col-grow text-left q-pl-sm">CIVIL STATUS</div>
              </div>
              <div class="col-grow row no-wrap border-black q-pl-sm q-py-none">
                <div class="col column no-wrap">
                  <q-checkbox size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                              v-for="n in ['Single', 'Widowed', 'Other/s:']" :label="n" :key="`civilLabel1-${n}`"
                              :model-value="user['CivilStatus'] === n.toUpperCase()" />
                </div>
                <div class="col column no-wrap">
                  <q-checkbox size="sm" color="black" checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png" dense
                              v-for="n in ['Married', 'Separated']" :label="n" :key="`civilLabel2-${n}`"
                              :model-value="user['CivilStatus'] === n.toUpperCase()" />
                </div>
              </div>
            </div> <!-- COLUMN 6 -->

            <div class="col-shrink row no-wrap">
              <div class="row no-wrap border-black bg-grey-5 label-max-width q-pt-none items-center">
                <div class="col-shrink text-right q-pl-sm">7.</div>
                <div class="col-grow text-left q-pl-sm">HEIGHT (m)</div>
              </div>
              <div class="col-grow row items-center border-black f-field q-pt-none q-pl-sm label-max-height">
                {{ parseFloat(user['Heights'])?.toFixed(2) }}
              </div>
            </div> <!-- COLUMN 7 -->

            <div class="col-shrink row no-wrap">
              <div class="row no-wrap border-black bg-grey-5 label-max-width q-pt-none items-center">
                <div class="col-shrink text-right q-pl-sm">8.</div>
                <div class="col-grow text-left q-pl-sm">WEIGHT (kg)</div>
              </div>
              <div class="col-grow row items-center border-black f-field q-pt-none q-pl-sm label-max-height">{{ parseFloat(user['Weights'])?.toFixed(2) }}</div>
            </div> <!-- COLUMN 8 -->

          </div>
        </div> <!-- COLUMNS 6, 7, 8 -->
        <div class="col-7 row no-wrap">
          <div class="col-3 column no-wrap justify-between bg-grey-5 border-black label-max-width">
            <div class="col-1 row no-wrap bg-grey-5 q-pt-xs">
              <div class="col-shrink text-right q-pl-sm ">17.</div>
              <div class="col-grow text-left q-pl-sm">RESIDENTIAL ADDRESS</div>
            </div>
            <div class="col-2 q-mx-md q-pb-sm text-center">ZIP CODE</div>
          </div>

          <div class="col-grow column no-wrap">
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Rhouse'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Rstreet'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray; line-height: 0.8em">
                <span class="col-6 text-center">House/Block/Lot No.</span>
                <span class="col-6 text-center">Street</span>
              </div>
            </div>
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Rsubdivision'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Rbarangay'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray;line-height: 0.8em">
                <span class="col-6 text-center">Subdivision/Village</span>
                <span class="col-6 text-center">Barangay</span>
              </div>
            </div>
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Rcity'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Rprovince'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray;line-height: 0.8em">
                <span class="col-6 text-center">City/Municipality</span>
                <span class="col-6 text-center">Province</span>
              </div>
            </div>
            <div class="col border-black row no-wrap items-center q-pl-sm">{{ user['Rzip'] }}</div>
          </div>
        </div> <!-- COLUMN 17 -->

        <div class="col-5 row">
          <div class="col-grow column">

            <div class="col row no-wrap label-max-height">
              <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-pt-none">
                <div class="col-shrink text-right q-pl-sm ">9.</div>
                <div class="col-grow text-left q-pl-sm">BLOOD TYPE</div>
              </div>
              <div class="col row items-center border-black q-pl-sm f-field text-uppercase">{{ user['BloodType'] }}</div>
            </div> <!-- COLUMN 9 -->

            <div class="col row no-wrap label-max-height">
              <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-pt-none">
                <div class="col-shrink text-right q-pl-sm ">10.</div>
                <div class="col-grow text-left q-pl-sm">GSIS ID NO.</div>
              </div>
              <div class="col row items-center border-black q-pl-sm f-field">{{ !user['GSISNo'] ? 'NONE': user['GSISNo'] }}</div>
            </div> <!-- COLUMN 10 -->

            <div class="col row no-wrap label-max-height">
              <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-pt-none">
                <div class="col-shrink text-right q-pl-sm ">11.</div>
                <div class="col-grow text-left q-pl-sm">PAG-IBIG ID NO.</div>
              </div>
              <div class="col row items-center border-black q-pl-sm f-field">{{ !user['PAGIBIGNo'] ? 'NONE': user['PAGIBIGNo'] }}</div>
            </div> <!-- COLUMN 11 -->

            <div class="col row no-wrap label-max-height">
              <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-pt-none">
                <div class="col-shrink text-right q-pl-sm ">12.</div>
                <div class="col-grow text-left q-pl-sm">PHILHEALTH ID NO.</div>
              </div>
              <div class="col row items-center border-black q-pl-sm f-field">{{ !user['PHEALTHNo'] ? 'NONE': user['PHEALTHNo'] }}</div>
            </div> <!-- COLUMN 12 -->

          </div>
        </div> <!-- COLUMNS 9, 10, 11, 12 -->
        <div class="col-7 row no-wrap">
          <div class="col-3 column no-wrap justify-between bg-grey-5 border-black label-max-width">
            <div class="col-1 row no-wrap bg-grey-5 q-pt-xs">
              <div class="col-shrink text-right q-pl-sm ">18.</div>
              <div class="col-grow text-left q-pl-sm">PERMANENT ADDRESS</div>
            </div>
            <div class="col-2 q-mx-md q-pb-sm text-center">ZIP CODE</div>
          </div>

          <div class="col-grow column no-wrap">
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Phouse'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Pstreet'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray;line-height: 0.8em">
                <span class="col-6 text-center">House/Block/Lot No.</span>
                <span class="col-6 text-center">Street</span>
              </div>
            </div>
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Psubdivision'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Pbarangay'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray;line-height: 0.8em">
                <span class="col-6 text-center">Subdivision/Village</span>
                <span class="col-6 text-center">Barangay</span>
              </div>
            </div>
            <div class="col-shrink border-black column no-wrap justify-end label-max-height">
              <div class="col row no-wrap justify-around items-end text-uppercase">
                <span class="col-6 text-center f-multiline">{{ user['Pcity'] }}</span>
                <span class="col-6 text-center f-multiline">{{ user['Pprovince'] }}</span>
              </div>
              <div class="col-shrink row no-wrap justify-around text-italic" style="border-top: 0.1rem solid gray;line-height: 0.8em">
                <span class="col-6 text-center">City/Municipality</span>
                <span class="col-6 text-center">Province</span>
              </div>
            </div>
            <div class="col border-black row no-wrap items-center q-pl-sm label-max-height">{{ user['Pzip'] }}</div>
          </div>
        </div> <!-- COLUMN 18 -->



        <div class="col-5 row">
          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">13.</div>
              <div class="col-grow text-left q-pl-sm">SSS NO.</div>
            </div>
            <div class="col-grow column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['SSSNo'] ? 'NONE': user['SSSNo'] }}</div>
          </div> <!-- COLUMN 13 -->

          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">14.</div>
              <div class="col-grow text-left q-pl-sm">TIN NO.</div>
            </div>
            <div class="col-grow column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['TINNo'] ? 'NONE': user['TINNo'] }}</div>
          </div> <!-- COLUMN 14 -->

          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">15.</div>
              <div class="col-grow text-left q-pl-sm">AGENCY EMPLOYEE NO.</div>
            </div>
            <div class="col-grow column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['ControlNo'] ? 'NONE': user['ControlNo'] }}</div>
          </div> <!-- COLUMN 15 -->

        </div> <!-- COLUMNS 13, 14, 15 -->
        <div class="col-7 row">
          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">19.</div>
              <div class="col-grow text-left q-pl-sm">TELEPHONE NO.</div>
            </div>
            <div class="col column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['TelNo'] ? 'NONE': user['TelNo'] }}</div>
          </div> <!-- COLUMN 19 -->

          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">20.</div>
              <div class="col-grow text-left q-pl-sm">MOBILE NO.</div>
            </div>
            <div class="col column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['CellphoneNo'] ? 'NONE': user['CellphoneNo'] }}</div>
          </div> <!-- COLUMN 20 -->

          <div class="col-12 row no-wrap">
            <div class="row no-wrap border-black bg-grey-5 label-max-width items-center label-max-height">
              <div class="col-shrink text-right q-pl-sm ">21.</div>
              <div class="col-grow text-left q-pl-sm">E-MAIL ADDRESS (if any)</div>
            </div>
            <div class="col column no-wrap justify-center border-black q-pl-sm f-field">{{ !user['EmailAdd'] ? 'NONE': user['EmailAdd'] }}</div>
          </div> <!-- COLUMN 21 -->

        </div> <!-- COLUMNS 19, 20, 21 -->



        <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">II. FAMILY BACKGROUND</div>

        <div class="col-7 row">
          <!-- region COLUMN 22 -->
          <div class="row no-wrap border-black label-max-width">
            <div class="col-shrink bg-grey-5 text-right q-pl-sm row no-wrap items-start">
              <div class="col-shrink row no-wrap items-center q-pr-sm label-max-height">22.</div>
            </div>
            <div class="col-grow column no-wrap bg-grey-5">
              <div v-for="n in ['SPOUSE\'S SURNAME', 'FIRST NAME', 'MIDDLE NAME']" :key="`spouseLabel${n}`"
                   class="text-left row no-wrap items-center label-max-height">
                {{n}}
              </div>
            </div>
          </div>
          <div class="col row">
            <div class="col-12 row no-wrap items-center border-black label-max-height f-field q-pl-sm text-uppercase">{{ user['SpouseName'] }}</div>
            <div class="col-12 row no-wrap label-max-height">
              <div class="col-grow row no-wrap items-center border-black f-field q-pl-sm text-uppercase">
                {{ user['SpouseFirstname'] }}
              </div>
              <!-- TODO: implement databinding -->
              <div class="col-shrink q-pl-xs border-black bg-grey-5 label-max-width column">
                <div class="col">NAME EXTENSION (JR, SR)</div>
                <div class="col">{{ (user['Sex'] !== 'MALE')? (user['SpouseNameExt'] ?? 'NONE'): 'N/A' }}</div>
              </div>
            </div>
            <div class="col-12 row no-wrap items-center border-black label-max-height f-field q-pl-sm text-uppercase">{{ user['SpouseMiddlename'] }}</div>
          </div>

          <div class="col-12 row no-wrap">
            <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-py-none">
              <div class="col-shrink q-pl-sm"/><div class="col-grow text-left q-pl-sm">OCCUPATION</div>
            </div>
            <div class="col row no-wrap items-center border-black q-pl-sm f-field text-uppercase label-max-height">{{ !user['Occupation']? 'NONE': user['Occupation'] }}</div>
          </div>

          <div class="col-12 row no-wrap">
            <div class="row no-wrap items-center border-black bg-grey-5 label-max-width q-py-none">
              <div class="col-shrink text-right q-pl-sm"/><div class="col-grow text-left q-pl-sm">EMPLOYER/BUSINESS NAME</div>
            </div>
            <div class="col row no-wrap items-center border-black q-pl-sm f-field text-uppercase label-max-height">
              {{ !user['Occupation']? 'N/A': (!user['SpouseEmployer']? 'NONE': user['SpouseEmployer']) }}
            </div>
          </div>

          <div class="col-12 row no-wrap">
            <div class="row no-wrap items-center border-black bg-grey-5 label-max-width">
              <div class="col-shrink text-right q-pl-sm "/>
              <div class="col-grow text-left q-pl-sm">BUSINESS ADDRESS</div>
            </div>
            <div class="col row no-wrap items-center border-black q-pl-sm f-field text-uppercase label-max-height">
              {{ !user['Occupation']? 'N/A': (!user['SpouseEmpAddress']? 'NONE': user['SpouseEmpAddress']) }}
            </div>
          </div>

          <div class="col-12 row no-wrap">
            <div class="row no-wrap items-center border-black bg-grey-5 label-max-width">
              <div class="col-shrink text-right q-pl-sm "/>
              <div class="col-grow text-left q-pl-sm">TELEPHONE NO.</div>
            </div>
            <div class="col row no-wrap items-center border-black q-pl-sm f-field text-uppercase label-max-height">
              {{ !user['Occupation']? 'N/A': (!user['SpouseEmpTel']? 'NONE': user['SpouseEmpTel']) }}
            </div>
          </div> <!-- endregion COLUMN 22 -->

          <!-- region COLUMN 24 -->
          <div class="col-12 row no-wrap border-black">
            <div class="row no-wrap border-black label-max-width">
              <div class="col-shrink bg-grey-5 text-right q-pl-sm row items-start"><div class="col-shrink row items-center q-pr-sm label-max-height">24.</div></div>
              <div class="col-grow column bg-grey-5">
                <div v-for="n in [`FATHER\'S SURNAME`, 'FIRST NAME', 'MIDDLE NAME']" :key="`fatherLabel${n}`"
                     class="text-left row no-wrap items-center label-max-height">
                  {{n}}
                </div>
              </div>
            </div>
            <div class="col row text-uppercase">
              <div class="col-12 row no-wrap items-center border-black label-max-height f-field q-pl-sm">{{ user['FatherName'] }}</div>
              <div class="col-12 row no-wrap label-max-height">
                <div class="col-grow row no-wrap items-center border-black f-field q-pl-sm">
                  {{ user['FatherFirstname'] }}
                </div>
                <div class="col-shrink q-pl-xs border-black bg-grey-5 label-max-width column">
                  <div class="col">NAME EXTENSION (JR, SR)</div>
                  <div class="col">{{ user['FatherNameExt'] ?? 'NONE' }}</div>
                </div>
              </div>
              <div class="col-12 row no-wrap items-center border-black label-max-height f-field q-pl-sm">{{ user['FatherMiddlename'] }}</div>
            </div>

          </div> <!-- endregion COLUMN 24 -->

          <!-- region COLUMN 25 -->
          <div class="col-12 row no-wrap border-black">
            <div class="row no-wrap border-black label-max-width" style="border-right: 0">
              <div class="col-shrink bg-grey-5 text-right q-pl-sm row no-wrap items-start">
                <div class="col-shrink row no-wrap items-center q-pr-sm label-max-height">25.</div>
              </div>
              <div class="col-grow column no-wrap bg-grey-5">
                <div v-for="n in ['MOTHER\'S MAIDEN NAME', 'SURNAME', 'FIRST NAME', 'MIDDLE NAME']" :key="`motherLabel${n}`" class="text-left row no-wrap items-center label-max-height">{{n}}</div>
              </div>
            </div>
            <div class="col row text-uppercase">
              <div class="col-12 bg-grey-5 label-max-height border-black" style="border-left: 0"/>
              <div class="col-12 row items-center border-black label-max-height f-field q-pl-sm">{{ user['MotherName'] }}</div>
              <div class="col-12 row items-center border-black label-max-height f-field q-pl-sm">{{ user['MotherFirstname'] }}</div>
              <div class="col-12 row items-center border-black label-max-height f-field q-pl-sm">{{ user['MotherMiddlename'] }}</div>
            </div>

          </div> <!-- endregion COLUMN 25 -->

        </div> <!-- COLUMNS 22, 24, 25 -->
        <div class="col-5 row">
          <div class="col-12 row no-wrap label-max-height">
            <div class="col-9 border-black row no-wrap q-pl-xs">
              <div class="col-shrink text-right row no-wrap items-start">
                <div class="col-shrink row no-wrap items-center">23.</div>
              </div>
              <div class="col-grow f-multiline q-pl-xs row no-wrap items-center">NAME of CHILDREN<br/>(Write full name and list all)</div>
            </div>
            <div class="col-3 border-black column flex-center">
              <div class="f-multiline text-center">DATE OF BIRTH<br/>(mm/dd/yyyy)</div>
            </div>
          </div>
          <div class="col-12 row no-wrap label-max-height text-uppercase" v-for="(child, n) in mainChildren" :key="`mainChild${n}`">
            <div class="col-9 border-black column no-wrap justify-center q-pl-sm f-field">{{ child['ChildName'] }}</div>
            <div class="col-3 border-black column no-wrap justify-center q-pl-sm f-field">{{
                createDate(child['BirthDate']).str
              }}</div>
          </div>
          <div class="col-12 row no-wrap label-max-height" v-for="n in (max.children - mainChildren.length)" :key="`emptyMainChild${n}`">
            <div v-if="n === 1" class="col-9 border-black text-italic f-field row flex-center">
              {{ !mainChildren.length ? 'NONE' : '**NOTHING FOLLOWS**' }}
            </div>
            <div v-else class="col-9 border-black" />
            <div class="col-3 border-black" />
          </div>
          <div class="col-12 border-black column no-wrap justify-center text-negative text-center text-italic text-weight-bold label-max-height">(Continue on separate sheet if necessary)</div>
        </div> <!-- COLUMN 23 -->


        <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">III. EDUCATIONAL BACKGROUND</div>

        <!-- start COLUMN 26 -->
        <div class="col-12 row bg-grey-5" style="max-height: 42px">
          <div class="col-shrink row border-black label-max-width">
            <div class="col-shrink q-py-sm q-pl-sm text-right">26.</div>
            <div class="col-grow text-left q-py-sm q-pl-sm">LEVEL</div>
          </div>
          <div class="col border-black flex flex-center" style="max-width: 120px">NAME OF SCHOOL</div>
          <div class="col-grow border-black column flex-center text-center f-multiline">
            BASIC EDUCATION/DEGREE/COURSE<br/>(Write in full)
          </div>
          <div class="col-1 row">
            <div class="col-12 border-black text-center f-multiline q-py-xs">PERIOD OF ATTENDANCE</div>
            <div class="col-6 border-black text-center">From</div>
            <div class="col-6 border-black text-center">To</div>
          </div>
          <div class="col border-black column flex-center text-center f-multiline" style="max-width: 80px">HIGHEST LEVEL<br/>/UNITS EARNED<br/>(if not graduated)</div>
          <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width:62px">YEAR GRADUATED</div>
          <div class="col border-black column flex-center text-center f-multiline" style="max-width:120px">SCHOLARSHIP/ACADEMIC<br/>HONORS RECEIVED</div>
        </div>
        <div v-for="(item, n) in mainEducation" class="col-12 row no-wrap label-max-height text-uppercase" :key="`mainEduc${n}`">
          <div class="col-shrink border-black label-max-width f-field row items-center q-pl-sm">{{ item['Education'] }}</div>
          <div class="col border-black row no-wrap flex-center text-center f-multiline" :style="`max-width: 120px; font-size:${measure(item.School, 30, 45)}px`">{{ item['School'] }}</div>
          <div class="col border-black row no-wrap flex-center text-center f-multiline f-field" :style="`font-size:${measure(item.Degree, 40, 55)}px`">{{ item['Degree'] }}</div>
          <div class="col-1 row no-wrap">
            <div class="col-6 label-max-height border-black row no-wrap flex-center text-center f-field">{{ item['DateAttend'].slice(0, 4) }}</div>
            <div class="col-6 label-max-height border-black row no-wrap flex-center text-center f-field">{{ item['DateAttend'].slice(-4) }}</div>
          </div>
          <div class="col border-black row no-wrap flex-center f-field" style="max-width: 80px">{{ item['Graduated'] === 'YES'? 'N/A': item['NumUnits'] }}</div>
          <div class="col-1 border-black row no-wrap flex-center text-center f-field" style="max-width:62px">{{ item['Graduated'] !== 'YES'? 'N/A': item['DateAttend'].slice(-4) }}</div>
          <div class="col border-black row no-wrap flex-center text-center f-field" style="max-width:120px">{{ !item['Honors']? 'N/A': item['Honors'] }}</div>
        </div>
        <div v-for="n in (max.education - mainEducation.length)" :key="`emptyMainEduc${n}`" class="col-12 row no-wrap label-max-height">
          <div v-if="n === 1" class="col-shrink border-black label-max-width text-italic f-field row flex-center" >
            {{ !mainEducation.length ? 'NONE' : '**NOTHING FOLLOWS**' }}
          </div>
          <div v-else class="col-shrink border-black label-max-width"/>
          <div class="col border-black" style="max-width: 120px"/>
          <div class="col-grow border-black"/>
          <div class="col-1 row no-wrap">
            <div class="col-6 border-black"/>
            <div class="col-6 border-black"/>
          </div>
          <div class="col border-black" style="max-width: 80px"/>
          <div class="col-1 border-black" style="max-width:62px"/>
          <div class="col border-black" style="max-width:120px"/>
        </div>
        <!-- end COLUMN 26 -->

        <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>

        <div class="col-12 row no-wrap border-black label-max-height">
          <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
          <div class="col" style="max-width: 120px"/>
          <div class="col-grow"/>
          <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
          <div class="col" style="max-width: 80px"/>
          <div class="col-1" style="max-width:62px"/>
          <div class="col" style="max-width:120px"/>
        </div>

        <div class="col-12 row reverse no-wrap text-italic text-weight-light q-pt-xs q-pb-md">CS FORM 212 (Revised 2017), Page 1 of {{ state.pageCount.length }}</div>
      </div>
      <!-- endregion PAGE 1 -->
    </div>



    <!-- PAGE 2 -->
    <div class="col-12 row q-px-md q-pt-lg" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">IV. CIVIL SERVICE ELIGIBILITY</div>

      <div class="col-12 row no-wrap bg-grey-5" style="max-height: 42px">
        <div class="col-5 row no-wrap border-black label-max-width">
          <div class="col-shrink q-pt-xs q-pl-sm text-right">27.</div>
          <div class="col-grow text-left q-py-sm q-px-xs text-center f-multiline">CAREER SERVICE / RA 1080 (BOARD/BAR)<br/>UNDER
            SPECIAL LAWS / CES / CSEE<br/>BARANGAY ELIGIBILITY / DRIVER'S LICENSE</div>
        </div>
        <div class="col-1 border-black row flex-center text-center f-multiline">RATING<br/>(if applicable)</div>
        <div class="col border-black row flex-center text-center f-multiline" style="max-width:80px">
          DATE OF EXAMINATION /<br/>CONFERMENT
        </div>
        <div class="col border-black row flex-center text-center f-multiline">PLACE OF EXAMINATION / CONFERMENT</div>
        <div class="col-2 column no-wrap">
          <div class="col border-black text-center f-multiline q-py-xs">LICENSE (if applicable)</div>
          <div class="col-6 row no-wrap">
            <div class="col-6 border-black q-py-xs text-center">NUMBER</div>
            <div class="col-6 border-black row flex-center f-multiline">Date of<br/>Validity</div>
          </div>
        </div>
      </div>
      <div v-for="(item, n) in mainEligibilities" class="col-12 row no-wrap label-max-height text-uppercase" :key="`mainEligi${n}`">
        <div class="col-5 row no-wrap border-black label-max-width q-pl-xs">{{ item['CivilServe'] }}</div>
        <div class="col-1 border-black row flex-center text-center f-multiline">{{ parseFloat(item['Rates'])?.toFixed(2) }}</div>
        <div class="col border-black row flex-center text-center f-multiline" style="max-width:80px">{{ createDate(item['Dates']).str }}</div>
        <div class="col border-black row flex-center text-center f-multiline" :style="`font-size:${measure(item.Place, 60, 90)}px`">{{ item['Place'] }}</div>
        <div class="col-2 row no-wrap">
          <div class="col-6 border-black q-py-xs text-center">{{ !item['LNumber']? 'N/A': item['LNumber'] }}</div>
          <div class="col-6 border-black q-py-xs text-center f-multiline">{{
            item['LDate'] === '1900-01-01' ? 'N/A': (
              !item['LDate'] ? 'N/A': createDate(item['LDate']).str
            )
            }}</div>
        </div>
      </div>
      <div v-for="n in (max.eligibilities - mainEligibilities.length)" class="col-12 row no-wrap label-max-height" :key="`emptyMainEligi${n}`">
        <div v-if="n === 1" class="col-5 row items-center border-black label-max-width f-multiline q-pl-xs text-italic f-field row flex-center" >
          {{ !mainEligibilities.length ? 'NONE' : '**NOTHING FOLLOWS**' }}
        </div>
        <div v-else class="col-5 row items-center border-black label-max-width f-multiline q-pl-xs"/>
        <div class="col-1 border-black f-multiline"/>
        <div class="col border-black f-multiline" style="max-width:80px"/>
        <div class="col border-black"/>
        <div class="col-2 row no-wrap"><div class="col-6 border-black"/><div class="col-6 border-black"/></div>
      </div>


      <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>


      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs column no-wrap" style="max-height: 30px">
        <div class="col" style="font-size: small">V. WORK EXPERIENCE</div>
        <div class="col">
          (Include private employment. Start from your recent work) Description of duties should be
          indicated in the attached Work Experience sheet.
        </div>
      </div>

      <div class="col-12 row no-wrap bg-grey-5" style="max-height: 50px">
        <div class="col-shrink column no-wrap label-max-width">
          <div class="col border-black row no-wrap content-start">
            <div class="col-shrink q-pl-sm text-right">28.</div>
            <div class="col-grow q-px-xs f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          </div>
          <div class="col-6 row no-wrap">
            <div class="col-6 border-black q-py-xs text-center">From</div>
            <div class="col-6 border-black q-py-xs text-center">To</div>
          </div>
        </div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">POSITION TITLE<br/>(Write in full / Do not abbreviate)</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">DEPARTMENT / AGENCY / OFFICE / COMPANY<br/>(Write in full / Do not abbreviate)</div>
        <div class="col-1 border-black row no-wrap flex-center text-center f-multiline">MONTHLY SALARY</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">SALARY/JOB/PAY GRADE<br/>(if applicable)<br/>& STEP (Format "00-0")<br/>INCREMENT</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline" style="max-width: 80px">STATUS OF<br/>APPOINTMENT</div>
        <div class="col-1 border-black row no-wrap flex-center text-center f-multiline">GOV'T<br/>SERVICE<br/>(Y/N)</div>
      </div>
      <div v-for="(item, n) in state.experiences[0]" class="col-12 row no-wrap label-max-height text-uppercase" :key="`mainExp${n}`">
        <div class="col-shrink row label-max-width">
          <div class="col-6 border-black row flex-center">{{ createDate(item['wfrom']).str }}</div>
          <div class="col-6 border-black row flex-center">
            {{ item['wto'].toLowerCase().includes('current')? 'PRESENT': createDate(item['wto']).str }}
          </div>
        </div>
        <div class="col border-black flex flex-center text-center f-multiline" :style="`font-size:${measure(item.wposition, 40, 65)}px`">{{ item['wposition'] }}</div>
        <div class="col border-black column flex-center text-center f-multiline" :style="`font-size:${measure(item.wcompany,50, 75)}px`">{{ item['wcompany'] }}</div>
        <div class="col-1 border-black row items-center justify-end text-right q-pr-xs">{{ formatMoney(item['wsalary']) }}</div>
        <div class="col border-black column flex-center text-center f-multiline">{{ item['wgrade'] }}</div>
        <div class="col border-black column flex-center text-center f-multiline" style="max-width: 80px">
          {{ item['status'].toLowerCase().includes('regular') ? 'PERMANENT': item['status'] }}
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ item['wgov'].charAt(0) }}</div>
      </div>
      <div v-for="n in (max.experiences - state.experiences[0].length)" class="col-12 row no-wrap label-max-height" :key="`emptyMainExp${n}`">
        <div class="col-shrink row no-wrap label-max-width">
          <div class="col-6 border-black" /><div class="col-6 border-black" />
        </div>
        <div v-if="n === 1" class="col border-black f-multiline text-italic f-field row flex-center" >
          {{ !state.experiences[0].length ? 'NONE' : '**NOTHING FOLLOWS**' }}
        </div>
        <div v-else class="col border-black f-multiline" />
        <div class="col border-black f-multiline" />
        <div class="col-1 border-black" />
        <div class="col border-black f-multiline" />
        <div class="col border-black f-multiline" style="max-width: 80px" />
        <div class="col-1 border-black f-multiline" />
      </div>

      <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>

      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div>

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs q-pb-sm">CS FORM 212 (Revised 2017), Page 2 of {{ state.pageCount.length }}</div>

    </div>



    <!-- PAGE 3 -->
    <div class="col-12 row q-px-md q-pt-lg" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S</div>

      <div class="col-12 row no-wrap bg-grey-5">
        <div class="col row q-pl-xs border-black label-max-width">
          <div class="col-shrink q-py-sm q-pl-sm text-right">29.</div>
          <div class="col-grow row items-center text-left q-py-sm q-px-xs text-center f-multiline">NAME & ADDRESS OF ORGANIZATION<br/>(Write in full)</div>
        </div>
        <div class="col-2 row flex-center text-center f-multiline">
          <div class="col-12 border-black row flex-center q-py-sm q-px-xs text-center f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          <div class="col-6 border-black q-py-xs text-center">From</div>
          <div class="col-6 border-black q-py-xs text-center">To</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline">NUMBER OF HOURS</div>
        <div class="col border-black row items-center q-pl-xs f-multiline">POSITION / NATURE OF WORK</div>
      </div>
      <div v-for="(item, n) in mainVolunteerings" class="col-12 row no-wrap label-max-height text-uppercase" :key="`mainVolunt${n}`">
        <div class="col q-pl-xs border-black label-max-width row items-center f-multiline">{{ item['OrgName'] }}</div>
        <div class="col-2 row text-center">
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateFrom']).str  }}</div>
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateTo']).str }}</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ !item['NoHours']? 'N/A' : item['NoHours'] }}</div>
        <div class="col border-black row items-center q-pl-xs f-multiline" :style="`font-size:${measure(item.OrgPosition, 90, 120)}px`">{{ item['OrgPosition'] }}</div>
      </div>

      <template v-if="max.volunteerings-mainVolunteerings.length > 0">
        <div v-for="n in (max.volunteerings - mainVolunteerings.length)" class="col-12 row no-wrap label-max-height" :key="`emptyMainVolunt${n}`">
          <div v-if="n === 1" class="col q-pl-xs border-black label-max-width text-italic f-field row flex-center">
            {{ !mainVolunteerings.length ? 'NONE' : '**NOTHING FOLLOWS**' }}
          </div>
          <div v-else class="col q-pl-xs border-black label-max-width" />
          <div class="col-2 row">
            <div class="col-6 border-black q-py-xs text-center" />
            <div class="col-6 border-black q-py-xs text-center" />
          </div>
          <div class="col-1 border-black column flex-center" />
          <div class="col border-black row item-center q-pl-xs" />
        </div>
      </template>

      <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>


      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED</div>

      <div class="col-12 row bg-grey-5">
        <div class="col row border-black label-max-width">
          <div class="col-shrink q-py-sm q-pl-sm text-right">30.</div>
          <div class="col row items-center text-left q-py-sm q-px-xs text-center f-multiline">TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS<br/>(Write in full)</div>
        </div>
        <div class="col-2 row text-center f-multiline">
          <div class="col-12 border-black row flex-center q-py-sm q-px-xs text-center f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          <div class="col-6 border-black q-py-xs text-center">From</div>
          <div class="col-6 border-black q-py-xs text-center">To</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width:40px">NO. OF HOURS</div>
        <div class="col-1 border-black column flex-center text-center f-multiline">Type of LD<br/>(Managerial / Supervisory / Technical / etc)</div>
        <div class="col-3 border-black column flex-center text-center f-multiline">CONDUCTED/SPONSORED BY<br/>(Write in full)</div>
      </div>
      <div v-for="(item, n) in mainInterventions" class="col-12 row label-max-height text-uppercase" :key="`mainTrain${n}`">
        <div class="col row border-black label-max-width">
          <div class="col-shrink row items-center text-left q-px-xs f-field f-multiline" :style="`font-size: ${measure(item.Training)}px`">{{ item['Training'] }}</div>
        </div>
        <div class="col-2 row f-multiline">
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateFrom']).str }}</div>
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateTo']).str }}</div>
        </div>
        <div class="col-1 border-black column justify-center text-right q-pr-xs f-multiline" style="max-width: 40px">{{ item['NumHours'] }}</div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ item['type'] }}</div>
        <div class="col-3 border-black row items-center text-left f-field q-px-xs f-multiline" :style="`font-size: ${ measure(item.Conductor, 60, 90) }px`">{{ item['Conductor'] }}</div>
      </div>
      <template v-if="max.interventions-mainInterventions.length > 0">
        <div v-for="n in (max.interventions - mainInterventions.length)" class="col-12 row label-max-height" :key="`emptyMainTrain${n}`">
          <div class="col row border-black label-max-width">
            <div v-if="n === 1" class="col row flex-center q-py-sm q-px-xs text-italic f-field text-center f-multiline">
              {{ !mainInterventions.length ? 'NONE' : '**NOTHING FOLLOWS**' }}
            </div>
            <div v-else class="col row items-center text-left q-py-sm q-px-xs text-center f-multiline" />
          </div>
          <div class="col-2 row f-multiline">
            <div class="col-6 border-black q-py-xs text-center"/>
            <div class="col-6 border-black q-py-xs text-center"/>
          </div>
          <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width: 40px"/>
          <div class="col-1 border-black column flex-center text-center f-multiline"/>
          <div class="col-3 border-black column flex-center text-center f-multiline"/>
        </div>
      </template>

      <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>



      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs" style="font-size: small">VIII. OTHER INFORMATION</div>

      <div class="col-12 row no-wrap bg-grey-5">
        <div class="col-3 border-black q-pl-xs q-py-xs">31. SPECIAL SKILLS and HOBBIES</div>
        <div class="col border-black q-pl-xs q-py-xs f-multiline">32. NON-ACADEMIC DISTINCTIONS / RECOGNITION<br/>(Write in full)</div>
        <div class="col-3 border-black q-pl-xs q-py-xs f-multiline">33. MEMBERSHIP IN ASSOCIATION / ORGANIZATION<br/>(Write in full)</div>
      </div>
      <div class="col-12 row no-wrap"> <!-- TODO: implement databinding -->
        <div class="col-3 column no-wrap">
          <div v-for="(item, n) in state.skills[0]" class="col-shrink row items-center border-black label-max-height f-field f-multiline text-uppercase q-pl-xs"
               :style="`font-size:${measure(item.Skills, 50, 75)}px`"
               :key="`mainSkills${n}`">
            {{ item['Skills'] }}
          </div>
          <div v-for="n in (state.maxMain.skills - state.skills[0].length)" :key="`emptyMainSkills${n}`" class="col-shrink border-black label-max-height row flex-center">
            <span v-if="n === 1" class="f-field text-italic">
              {{ !state.skills[0].length ? 'NONE' : '**NOTHING FOLLOWS**' }}
            </span>
          </div>
        </div>
        <div class="col column no-wrap">
          <div v-for="(item, n) in state.nonAcademic[0]" class="col-shrink row items-center border-black label-max-height f-field f-multiline text-uppercase q-pl-xs"
               :style="`font-size:${measure(item.NonAcademic, 125, 170)}px`"
               :key="`mainNonAcademic${n}`">
            {{ item['NonAcademic'] }}
          </div>
          <div v-for="n in (state.maxMain.nonAcademic - state.nonAcademic[0].length)" :key="`emptyMainNonAcademic${n}`" class="col-shrink border-black label-max-height row flex-center">
            <span v-if="n === 1" class="f-field text-italic">
              {{ !state.nonAcademic[0].length ? 'NONE' : '**NOTHING FOLLOWS**' }}
            </span>
          </div>

        </div>
        <div class="col-3 column no-wrap">
          <div v-for="(item, n) in state.organizations[0]" class="col-shrink border-black row items-center label-max-height f-multiline text-uppercase q-pl-xs"
               :style="`font-size:${measure(item.Organization, 50, 75)}px`"
               :key="`mainOrganization${n}`">
            {{ item['Organization'] }}
          </div>
          <div v-for="n in (state.maxMain.organizations - state.organizations[0].length)" :key="`emptyMainOrganization${n}`" class="col-shrink border-black label-max-height row flex-center">
            <span v-if="n === 1" class="f-field text-italic">
              {{ !state.organizations[0].length ? 'NONE' : '**NOTHING FOLLOWS**' }}
            </span>

          </div>
        </div>
      </div>

      <div class="col-12 bg-grey-5 border-black text-weight-bold text-italic q-pl-xs text-center text-negative text-weight-bold text-italic" style="font-size: x-small">(Continue on separate sheet if necessary)</div>


      <div class="col-12 row border-black">
        <div class="col-shrink label-max-height border-black label-max-width row flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col label-max-height" style="max-width: 120px"/>
        <div class="col-grow label-max-height"/>
        <div class="col-1 label-max-height border-black row flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col label-max-height" style="max-width: 80px"/>
        <div class="col-1 label-max-height" style="max-width:62px"/>
        <div class="col label-max-height" style="max-width:120px"/>
      </div>

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs q-pb-sm">CS FORM 212 (Revised 2017), Page 3 of {{ state.pageCount.length }}</div>

    </div>



    <!-- region PAGE 4 -->
    <div class="col-12 row q-px-md q-pt-md" style="aspect-ratio: 1/1.52">
      <!-- region COLUMN 34  -->
      <div class="col-12 column no-wrap">
        <div class="col row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 q-px-sm row no-wrap">
              <div class="col-shrink text-right">34.</div>
              <div class="col q-pl-xs f-field f-multiline" style="line-height: 1.1em">
                Are you related by consanguinity or affinity to the appointing or recommending authority, or to the
                chief
                of bureau or office or to the person who has immediate supervision over you in the Office, Bureau or
                Department where you will be apppointed,
              </div>
            </div>
          </div>
          <div class="col-4 border-black column no-wrap" style="border-bottom: 0"/>
        </div>
        <div class="col row no-wrap" style="max-height: 18px">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center">a. within the third degree?</div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice1-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q1'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap" style="max-height: 18px">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center">
            b. within the fourth degree (for Local Government Unit - Career Employees)?
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice2-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q11'] === ans"/>
          </div>
        </div>

        <div class="col row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12" style="max-height: 18px">If YES, give details:</div>
            <div class="col-12" style="border-bottom: thin solid black; height: 18px">{{ user['R11'] }}</div>
            <div class="col-12 q-pb-lg"/>
          </div>
        </div>
      </div>
      <!-- endregion COLUMN 34  -->


      <!-- region COLUMN 35  -->
      <div class="col-12 column no-wrap">
        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 q-px-sm row no-wrap">
              <div class="col-shrink text-right">35.</div>
              <div class="col q-pl-xs f-field">a. Have you ever been found guilty of any administrative offense?</div>
            </div>
          </div>
          <div class="col-4 border-black row no-wrap q-pl-lg" style="border-bottom: 0">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice3-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q4'] === ans"/>
          </div>
        </div>
        <div class="col-grow row no-wrap">
          <div class="col-8 border-black-x"/>
          <div class="col-4 border-black-x column no-wrap q-px-lg" style="border-bottom: thin solid black">
            <div class="col-shrink">If YES, give details:</div>
            <div class="col-shrink" style="border-bottom: thin solid black; height: 18px">{{ user['R4'] }}</div>
            <div class="col-shrink q-py-xs"/>
          </div>
        </div>

        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black-x column no-wrap">
            <div class="col-4 q-pr-sm q-pl-lg f-field">b. Have you been criminally charged before any court?</div>
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice4-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q7'] === ans"/>
          </div>
        </div>
        <div class="col-grow row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x"/>
          <div class="col-4 border-black-x column no-wrap q-px-lg">
            <div class="col-shrink">If YES, give details:</div>
            <div class="col-shrink column no-wrap">
              <div class="col-6 row no-wrap">
                <div class="col-5 text-right q-pr-sm">Date Filed:</div>
                <div class="col-grow" style="border-bottom: thin solid black; height: 14px">{{ user['R7'] }}</div>
              </div>
              <div class="col-6 row no-wrap">
                <div class="col-5 text-right q-pr-sm">Status of Case/s</div>
                <div class="col-grow" style="border-bottom: thin solid black; height: 14px">{{ user['R7'] }}</div>
              </div>
            </div>
            <div class="col-shrink q-py-xs"/>
          </div>
        </div>

      </div><!-- endregion COLUMN 35 -->


      <!-- region COLUMN 36  -->
      <div class="col-12 column no-wrap">
        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 row no-wrap">
              <div class="col-shrink q-px-sm text-right">36.</div>
              <div class="col q-pr-sm f-field f-multiline" style="line-height: 1.1em">
                Have you ever been convicted of any crime or violation of any law, decree, ordinance or regulation by any court or tribunal?
              </div>
            </div>
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice5-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q3'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12" style="max-height: 18px">If YES, give details:</div>
            <div class="col-12" style="border-bottom: thin solid black; height: 18px">{{ user['R3'] }}</div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>
      </div>
      <!-- endregion COLUMN 36 -->


      <!-- region COLUMN 37  -->
      <div class="col-12 column no-wrap">
        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 row no-wrap">
              <div class="col-shrink q-px-sm text-right">37.</div>
              <div class="col q-pr-sm f-field f-multiline" style="line-height: 1.1em">
                Have you ever been separated from the service in any of the
                following modes: resignation, retirement, dropped from the
                rolls, dismissal, termination, end of term, finished contract or
                phased out (abolition) in the public or private sector?
              </div>
            </div>
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice6-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q5'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12" style="max-height: 18px">If YES, give details:</div>
            <div class="col-12" style="border-bottom: thin solid black; height: 18px">{{ user['R5'] }}</div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>
      </div><!-- endregion COLUMN 37 -->


      <!-- region COLUMN 38  -->
      <div class="col-12 column no-wrap">

        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 q-px-sm row no-wrap">
              <div class="col-shrink text-right">38.</div>
              <div class="col q-pl-xs f-field">a. Have you ever been a candidate in a national or local election
                held within the last year (except Barangay election)?</div>
            </div>
          </div>
          <div class="col-4 border-black row no-wrap q-pl-lg" style="border-bottom: 0">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice7-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png"
                        unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['Q6'] === ans"/>
          </div>
        </div>

        <div class="col-grow row no-wrap">
          <div class="col-8 border-black-x"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12 row no-wrap">
              <div class="col-shrink ellipsis row no-wrap">If YES, give details:</div>
              <div class="col-grow ellipsis" style="border-bottom: thin solid black">{{ user['R6'] }}</div>
            </div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>

        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black-x column no-wrap">
            <div class="col-4 q-pr-sm q-pl-lg f-field" style="line-height: 1.1em">b. Have you resigned from the government service during the three
              (3)-month period before the last election to promote/actively
              campaign for a national or local candidate?</div>
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="(value, key) in {YES: !user['local'], NO: !!user['local']}" :key="`choice8-${key}`" :label="key" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="value"/>
          </div>
        </div>
        <div class="col-grow row no-wrap border-black-x" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12 row no-wrap">
              <div class="col-shrink ellipsis row no-wrap">If YES, give details:</div>
              <div class="col-grow ellipsis" style="border-bottom: thin solid black">{{ user['localdetails'] }}</div>
            </div>
            <div class="col-12 q-pb-lg"/>
          </div>
        </div>

      </div>
      <!--      endregion COLUMN 38 -->


      <!-- region COLUMN 39  -->
      <div class="col-12 column no-wrap">
        <div class="col-shrink row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 row no-wrap">
              <div class="col-shrink q-px-sm text-right">39.</div>
              <div class="col q-pr-sm f-multiline f-field" style="padding-top: 0.3em">
                Have you acquired the status of an immigrant or permanent
                resident of another country?
              </div>
            </div>
          </div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="(value, key) in {YES: !user['country'], NO: !!user['country']}" :key="`choice1-${key}`" :label="key" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="value"/>
          </div>
        </div>
        <div class="col row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12" style="max-height: 18px">If YES, give details:</div>
            <div class="col-12" style="border-bottom: thin solid black; height: 18px">{{ user['countrydetails'] }}</div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>
      </div><!-- endregion COLUMN 39  -->


      <!-- region COLUMN 40  -->
      <div class="col-12 column no-wrap">
        <div class="col row no-wrap">
          <div class="col-8 border-black column no-wrap" style="border-bottom: 0">
            <div class="col-4 row no-wrap">
              <div class="col-shrink q-px-sm text-right">40.</div>
              <div class="col q-pr-sm f-multiline f-field" style="line-height: 1.1em">
                Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna Carta for Disabled Persons (RA
                7277); and (c) Solo Parents Welfare Act of 2000 (RA 8972), please answer the following items:
              </div>
            </div>
          </div>
          <div class="col-4 border-black column no-wrap" style="border-bottom: 0"/>
        </div>


        <div class="col row no-wrap" style="max-height: 18px">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center f-field">a. Are you a member of any indigenous group?</div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice1-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['IP'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12 row no-wrap">
              <div class="col-shrink ellipsis row no-wrap">If YES, please specify:</div>
              <div class="col" style="border-bottom: thin solid black">{{ user['IPR'] }}</div>
            </div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>

        <div class="col row no-wrap">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center f-field">b. Are you a person with disability?</div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice2-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['PWD'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12 row no-wrap">
              <div class="col-shrink ellipsis row no-wrap">If YES, please specify ID No:</div>
              <div class="col" style="border-bottom: thin solid black">
                <!-- TODO implement ID No if YES -->
              </div>
            </div>
            <div class="col-12 q-pb-xs"/>
          </div>
        </div>


        <div class="col row no-wrap">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center f-field">c. Are you a solo parent?</div>
          <div class="col-4 border-black-x row no-wrap q-pl-lg">
            <q-checkbox v-for="ans in ['YES', 'NO']" :key="`choice2-${ans}`" :label="ans" class="col-6" size="sm" color="black" dense
                        checked-icon="img:/f/check_box_24dp.png" unchecked-icon="img:/f/check_box_outline_blank_24dp.png"
                        :model-value="user['SoloP'] === ans"/>
          </div>
        </div>
        <div class="col row no-wrap" style="border-bottom: thin solid black">
          <div class="col-8 border-black-x q-pl-lg row no-wrap items-center"/>
          <div class="col-4 border-black-x row q-px-lg">
            <div class="col-12 row no-wrap">
              <div class="col-shrink ellipsis row no-wrap">If YES, please specify ID No:</div>
              <div class="col-grow ellipsis" style="border-bottom: thin solid black">
                <!-- TODO implement ID No if YES -->
              </div>
            </div>
            <div class="col-12 q-pb-lg"/>
          </div>
        </div>

      </div><!-- endregion COLUMN 40  -->

      <div class="col-12 row no-wrap">
        <div class="col-8 column no-wrap">
          <!-- region COLUMN 41 -->
          <div class="col-shrink row border-black">
            <div class="col-12 row no-wrap border-black bg-grey-5">
              <div class="col-shrink text-right q-px-sm">41.</div>
              <div class="col-shrink">REFERENCES</div>
              <div class="col-grow text-negative">
                (Person not related by consanguinity or affinity to applicant (appointee)
              </div>
            </div>
            <div class="col-12 row no-wrap label-max-height" >
              <div class="col-4 border-black row flex-center text-center">NAME</div>
              <div class="col-5 border-black row flex-center text-center">ADDRESS</div>
              <div class="col-3 border-black row flex-center text-center">TEL NO.</div>
            </div>
            <!-- TODO implement databinding -->
            <div class="col-12 row no-wrap label-max-height" v-for="(item, n) in state.references.slice(0, max.references)" :key="`mainRef${n}`">
              <div class="col-4 border-black q-pl-xs text-uppercase">{{ item.name }}</div>
              <div class="col-5 border-black q-pl-xs text-uppercase f-multiline" style="padding-top: 0.3em">{{ item.address }}</div>
              <div class="col-3 border-black row justify-center">{{ item.telNo }}</div>
            </div>

            <template v-if="max.references-state.references.length > 0">
              <div class="col-12 row no-wrap label-max-height" v-for="n in (max.references - state.references.slice(0, max.references).length)" :key="`emptyMainRef${n}`">
                <div v-if="n === 1" class="col-4 border-black text-italic f-field row flex-center">
                  {{ !state.references.slice(0, max.references).length ? 'NONE' : '**NOTHING FOLLOWS**' }}
                </div>
                <div v-else class="col-4 border-black"/>
                <div class="col-5 border-black"/>
                <div class="col-3 border-black"/>
              </div>
            </template>
          </div><!-- endregion COLUMN 41 -->


          <!-- region COLUMN 42 -->
          <div class="col border-black bg-grey-5 row no-wrap q-pr-md">
            <div class="col-shrink text-right q-px-sm">42.</div>
            <div class="col-grow q-px-md f-text-justify f-field" style="line-height: 1.1em">
              I declare under oath that I have personally accomplished this Personal Data Sheet which is a true, correct
              and complete statement pursuant to the provisions of pertinent laws, rules and regulations of the Republic
              of the Philippines. I authorize the agency head/authorized representative to verify/validate the contents
              stated herein. I agree that any misrepresentation made in this document and its attachments shall cause
              the filing of administrative/criminal case/s against me.
            </div>
          </div><!-- endregion COLUMN 42 -->

        </div>

        <div class="col-4 border-black-x row flex-center q-py-sm">
          <div v-if="!idImageUrl" class="col-shrink border-black column no-wrap justify-evenly q-px-sm"
               style="font-size: xx-small; height: 45.7mm; width: 35.6mm">
            <p class="text-center">ID picture taken within the last 6 months 4.5 cm. X 3.5 cm (passport size)</p>
            <p class="text-center">Computer generated or photocopied picture is not acceptable</p>
          </div>
          <div v-else class="column no-wrap" style="height: 45.7mm; width: 35.6mm">
            <q-img :src="idImageUrl" fit="cover" style="height: 38mm; width: 35.6mm"/>
          </div>
        </div>
      </div>

      <div class="col-12 row no-wrap border-black-x">
        <div class="col-8 row no-wrap q-py-sm">
          <div class="col-6 row justify-center q-pl-sm items-stretch content-stretch full-height">
            <div class="col-12 column no-wrap">
              <div class="col border-black q-pl-xs bg-grey-5 f-field label-max-height">
                <div class="row no-wrap items-baseline">
                  <div class="col-shrink">Government Issued ID</div>
                  <div class="col ellipsis full-height" style="font-size: 6px; padding-left: 1px">(i.e. Passport, GSIS, SSS, PRC, Driver's License, etc.)</div>
                </div>
                <div class="text-italic no-padding no-margin">PLEASE INDICATE ID Number and Date of Issuance</div>
              </div> <!-- TODO databinding -->
              <div class="col row items-center no-wrap q-pl-xs border-black f-field">Government Isssued ID: </div>
              <div class="col row items-center no-wrap q-pl-xs border-black f-field">ID/License/Passport No.: </div>
              <div class="col row items-center no-wrap q-pl-xs border-black f-field">Date/Place of Issuance: </div>
            </div>


          </div>
          <div class="col-6 row justify-end q-pl-sm items-stretch content-stretch full-height">
            <div class="col-12 column no-wrap reverse">
              <div class="col-shrink text-center bg-grey-5 border-black" style="height:16px">Date Accomplished</div>
              <div class="col-shrink text-center border-black" style="height:16px"/>
              <div class="col-shrink text-center bg-grey-5 border-black" style="height:16px">Signature (Sign inside the box)</div>
              <div class="col-grow border-black"/>
            </div>
          </div>
        </div>

        <div class="col-4 row flex-center q-py-sm">
          <div class="col-7 column no-wrap reverse">
            <div class="col-shrink text-center border-black" style="height:16px">Right Thumbmark</div>
            <div class="col-grow border-black" style="height:100px"/>
          </div>
        </div>
      </div>

      <div class="col-12 column no-wrap border-black">
        <div class="col-shrink row no-wrap justify-center q-py-sm f-field">
          <div class="col-shrink">SUBSCRIBED AND SWORN to before me this</div>
          <div class="col-shrink q-py-xs" style="border-bottom: thin solid black; min-width: 100px"></div>
          <div class="col-shrink">, affiant exhibiting his/her validly issued government ID as indicated above.</div>
        </div>
        <div class="col-grow row no-wrap flex-center q-pt-sm q-pb-md">
          <div class="col-4 column no-wrap reverse">
            <div class="col-shrink text-center border-black" style="height:16px">Person Administering Oath</div>
            <div class="col-grow border-black" style="height:100px"/>
          </div>
        </div>
      </div>



      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page 4 of {{ state.pageCount.length }}</div>
    </div> <!-- endregion PAGE 4 -->


    <!-- region PAGE CHILDREN -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!extraChildren.length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">II. FAMILY BACKGROUND</div>

      <div class="col-12 row no-wrap label-max-height">
        <div class="col-8 border-black row no-wrap q-pl-xs">
          <div class="col-shrink text-right row no-wrap items-start">
            <div class="col-shrink row no-wrap items-center">23.</div>
          </div>
          <div class="col-grow f-multiline q-pl-xs row no-wrap items-center">NAME of CHILDREN<br/>(Write full name and list all)</div>
        </div>
        <div class="col-4 border-black column flex-center q-pl-sm">
          <div class="f-multiline text-center">DATE OF BIRTH<br/>(mm/dd/yyyy)</div>
        </div>
      </div>
      <div class="col-12 row no-wrap label-max-height text-uppercase" v-for="(child, n) in extraChildren" :key="`extraChild${n}`">
        <div class="col-8 border-black column no-wrap justify-center q-pl-sm f-field">{{ child['ChildName'] }}</div>
        <div class="col-4 border-black column no-wrap justify-center q-pl-sm f-field">{{
            createDate(child['BirthDate']).str
          }}</div>
      </div>

      <template v-if="maxExtra.children-extraChildren.length > 0">
        <div class="col-12 row no-wrap label-max-height" v-for="n in (maxExtra.children - extraChildren.length)" :key="`emptyExtraChild${n}`">
          <div v-if="n === 1" class="col-8 border-black text-italic f-field row flex-center" >**NOTHING FOLLOWS**</div>
          <div v-else class="col-8 border-black" />
          <div class="col-4 border-black" />
        </div>
      </template>

      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('children')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE CHILDREN -->


    <!-- region PAGE EDUCATION -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!extraEducation.length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">III. EDUCATIONAL BACKGROUND</div>

      <div class="col-12 row bg-grey-5" style="max-height: 42px">
        <div class="col-shrink row border-black label-max-width">
          <div class="col-shrink q-py-sm q-pl-sm text-right">26.</div>
          <div class="col-grow text-left q-py-sm q-pl-sm">LEVEL</div>
        </div>
        <div class="col border-black flex flex-center" style="max-width: 120px">NAME OF SCHOOL</div>
        <div class="col-grow border-black column flex-center text-center f-multiline">
          BASIC EDUCATION/DEGREE/COURSE<br/>(Write in full)
        </div>
        <div class="col-1 row">
          <div class="col-12 border-black text-center f-multiline q-py-xs">PERIOD OF ATTENDANCE</div>
          <div class="col-6 border-black text-center">From</div>
          <div class="col-6 border-black text-center">To</div>
        </div>
        <div class="col border-black column flex-center text-center f-multiline" style="max-width: 80px">HIGHEST LEVEL<br/>/UNITS EARNED<br/>(if not graduated)</div>
        <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width:62px">YEAR GRADUATED</div>
        <div class="col border-black column flex-center text-center f-multiline" style="max-width:120px">SCHOLARSHIP/ACADEMIC<br/>HONORS RECEIVED</div>
      </div>
      <div v-for="(item, n) in extraEducation" class="col-12 row no-wrap label-max-height text-uppercase" :key="`extraEduc${n}`">
        <div class="col-shrink border-black label-max-width f-field row items-center q-pl-sm">{{ item['Education'] }}</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline" :style="`max-width: 120px; font-size:${measure(item.School, 30, 45)}px`">{{ item['School'] }}</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline f-field" :style="`font-size:${measure(item.Degree, 40, 55)}px`">{{ item['Degree'] }}</div>
        <div class="col-1 row no-wrap">
          <div class="col-6 label-max-height border-black row no-wrap flex-center text-center f-field">{{ item['DateAttend'].slice(0, 4) }}</div>
          <div class="col-6 label-max-height border-black row no-wrap flex-center text-center f-field">{{ item['DateAttend'].slice(-4) }}</div>
        </div>
        <div class="col border-black row no-wrap flex-center f-field" style="max-width: 80px">{{ item['Graduated'] === 'YES'? 'N/A': item['NumUnits'] }}</div>
        <div class="col-1 border-black row no-wrap flex-center text-center f-field" style="max-width:62px">{{ item['Graduated'] === 'YES'? 'N/A': item['DateAttend'].slice(-4) }}</div>
        <div class="col border-black row no-wrap flex-center text-center f-field" style="max-width:120px">{{ !item['Honors']? 'N/A': item['Honors'] }}</div>
      </div>

      <template v-if="maxExtra.education-extraEducation.length > 0">
        <div v-for="n in (maxExtra.education - extraEducation.length)" :key="`emptyExtraEduc${n}`" class="col-12 row no-wrap label-max-height">
          <div v-if="n === 1" class="col-shrink border-black label-max-width text-italic f-field row flex-center" >**NOTHING FOLLOWS**</div>
          <div v-else class="col-shrink border-black label-max-width"/>
          <div class="col border-black" style="max-width: 120px"/>
          <div class="col-grow border-black"/>
          <div class="col-1 row no-wrap">
            <div class="col-6 border-black"/>
            <div class="col-6 border-black"/>
          </div>
          <div class="col border-black" style="max-width: 80px"/>
          <div class="col-1 border-black" style="max-width:62px"/>
          <div class="col border-black" style="max-width:120px"/>
        </div>
      </template>

      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('education')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE EDUCATION -->


    <!-- region PAGE ELIGIBILITIES -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!extraEligibilities.length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">IV. CIVIL SERVICE ELIGIBILITY</div>

      <div class="col-12 row no-wrap bg-grey-5" style="max-height: 42px">
        <div class="col-5 row no-wrap border-black label-max-width">
          <div class="col-shrink q-pt-xs q-pl-sm text-right">27.</div>
          <div class="col-grow text-left q-py-sm q-px-xs text-center f-multiline">CAREER SERVICE / RA 1080 (BOARD/BAR)<br/>UNDER
            SPECIAL LAWS / CES / CSEE<br/>BARANGAY ELIGIBILITY / DRIVER'S LICENSE</div>
        </div>
        <div class="col-1 border-black row flex-center text-center f-multiline">RATING<br/>(if applicable)</div>
        <div class="col border-black row flex-center text-center f-multiline" style="max-width:80px">
          DATE OF EXAMINATION /<br/>CONFERMENT
        </div>
        <div class="col border-black row flex-center text-center f-multiline">PLACE OF EXAMINATION / CONFERMENT</div>
        <div class="col-2 column no-wrap">
          <div class="col border-black text-center f-multiline q-py-xs">LICENSE (if applicable)</div>
          <div class="col-6 row no-wrap">
            <div class="col-6 border-black q-py-xs text-center">NUMBER</div>
            <div class="col-6 border-black row flex-center f-multiline">Date of<br/>Validity</div>
          </div>
        </div>
      </div>
      <div v-for="(item, n) in extraEligibilities" class="col-12 row no-wrap label-max-height text-uppercase" :key="`extraEligi${n}`">
        <div class="col-5 row no-wrap border-black label-max-width q-pl-xs">{{ item['CivilServe'] }}</div>
        <div class="col-1 border-black row flex-center text-center f-multiline">{{ parseFloat(item['Rates'])?.toFixed(2) }}</div>
        <div class="col border-black row flex-center text-center f-multiline" style="max-width:80px">{{ createDate(item['Dates']).str }}</div>
        <div class="col border-black row flex-center text-center f-multiline" :style="`font-size:${measure(item.Place, 60, 90)}px`">{{ item['Place'] }}</div>
        <div class="col-2 row no-wrap">
          <div class="col-6 border-black q-py-xs text-center">{{ !item['LNumber']? 'N/A': item['LNumber'] }}</div>
          <div class="col-6 border-black q-py-xs text-center f-multiline">{{ !item['LDate']? 'N/A': createDate(item['LDate']).str }}</div>
        </div>
      </div>

      <template v-if="maxExtra.eligibilities-extraEligibilities.length > 0">
        <div v-for="n in (maxExtra.eligibilities - extraEligibilities.length)" class="col-12 row no-wrap label-max-height" :key="`emptyExtraEligi${n}`">
          <div v-if="n === 1" class="col-5 row items-center border-black label-max-width f-multiline q-pl-xs text-italic f-field row flex-center" >**NOTHING FOLLOWS**</div>
          <div v-else class="col-5 row items-center border-black label-max-width f-multiline q-pl-xs"/>
          <div class="col-1 border-black f-multiline"/>
          <div class="col border-black f-multiline" style="max-width:80px"/>
          <div class="col border-black"/>
          <div class="col-2 row no-wrap"><div class="col-6 border-black"/><div class="col-6 border-black"/></div>
        </div>
      </template>


      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-py-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('eligibilities')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE ELIGIBILITIES -->


    <!-- region PAGE EXPERIENCES -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!state.experiences[1].length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs column no-wrap" style="max-height: 30px">
        <div class="col" style="font-size: small">V. WORK EXPERIENCE</div>
        <div class="col">
          (Include private employment. Start from your recent work) Description of duties should be
          indicated in the attached Work Experience sheet.
        </div>
      </div>

      <div class="col-12 row no-wrap bg-grey-5" style="max-height: 50px">
        <div class="col-shrink column no-wrap label-max-width">
          <div class="col-6 border-black row no-wrap">
            <div class="col-shrink q-py-sm q-pl-sm text-right">28.</div>
            <div class="col-grow q-py-sm q-px-xs f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          </div>
          <div class="col-6 row no-wrap">
            <div class="col-6 border-black q-py-xs text-center">From</div>
            <div class="col-6 border-black q-py-xs text-center">To</div>
          </div>
        </div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">POSITION TITLE<br/>(Write in full / Do not abbreviate)</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">DEPARTMENT / AGENCY / OFFICE / COMPANY<br/>(Write in full / Do not abbreviate)</div>
        <div class="col-1 border-black row no-wrap flex-center text-center f-multiline">MONTHLY SALARY</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline">SALARY/JOB/PAY GRADE<br/>(if applicable)<br/>& STEP (Format "00-0")<br/>INCREMENT</div>
        <div class="col border-black row no-wrap flex-center text-center f-multiline" style="max-width: 80px">STATUS OF<br/>APPOINTMENT</div>
        <div class="col-1 border-black row no-wrap flex-center text-center f-multiline">GOV'T<br/>SERVICE<br/>(Y/N)</div>
      </div>
      <div v-for="(item, n) in state.experiences[1]" class="col-12 row no-wrap label-max-height text-uppercase" :key="`extraExp${n}`">
        <div class="col-shrink row label-max-width">
          <div class="col-6 border-black row flex-center">{{ createDate(item['wfrom']).str }}</div>
          <div class="col-6 border-black row flex-center">{{ item['wto'].toLowerCase().includes('current')? 'PRESENT': createDate(item['wto']).str }}</div>
        </div>
        <div class="col border-black flex flex-center text-center f-multiline" :style="`font-size:${measure(item.wposition, 40, 65)}px`">{{ item['wposition'] }}</div>
        <div class="col border-black column flex-center text-center f-multiline" :style="`font-size:${measure(item.wcompany,50, 75)}px`">{{ item['wcompany'] }}</div>
        <div class="col-1 border-black row items-center justify-end text-right q-pr-xs">{{ formatMoney(item['wsalary']) }}</div>
        <div class="col border-black column flex-center text-center f-multiline">{{ item['wgrade'] }}</div>
        <div class="col border-black column flex-center text-center f-multiline" style="max-width: 80px">{{ item['status'] }}</div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ item['wgov'].charAt(0) }}</div>
      </div>

      <template v-if="maxExtra.experiences-state.experiences[1].length > 0">
        <div v-for="n in (maxExtra.experiences - state.experiences[1].length)" class="col-12 row no-wrap label-max-height" :key="`emptyExtraExp${n}`">

          <div class="col-shrink row no-wrap label-max-width">
            <div class="col-6 border-black" /><div class="col-6 border-black" />
          </div>
          <div v-if="n === 1" class="col border-black f-multiline text-italic f-field row flex-center" >**NOTHING FOLLOWS**</div>
          <div v-else class="col border-black f-multiline" />
          <div class="col border-black f-multiline" />
          <div class="col-1 border-black" />
          <div class="col border-black f-multiline" />
          <div class="col border-black f-multiline" style="max-width: 80px" />
          <div class="col-1 border-black f-multiline" />

        </div>
      </template>

      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('experiences')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE EXPERIENCES -->


    <!-- region PAGE VOLUNTEERINGS -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!extraVolunteerings.length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S</div>

      <div class="col-12 row no-wrap bg-grey-5">
        <div class="col row q-pl-xs border-black label-max-width">
          <div class="col-shrink q-py-sm q-pl-sm text-right">29.</div>
          <div class="col-grow row items-center text-left q-py-sm q-px-xs text-center f-multiline">NAME & ADDRESS OF ORGANIZATION<br/>(Write in full)</div>
        </div>
        <div class="col-2 row flex-center text-center f-multiline">
          <div class="col-12 border-black row flex-center q-py-sm q-px-xs text-center f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          <div class="col-6 border-black q-py-xs text-center">From</div>
          <div class="col-6 border-black q-py-xs text-center">To</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline">NUMBER OF HOURS</div>
        <div class="col border-black row items-center q-pl-xs f-multiline">POSITION / NATURE OF WORK</div>
      </div>
      <div v-for="(item, n) in extraVolunteerings" class="col-12 row no-wrap label-max-height text-uppercase" :key="`extraVolunt${n}`">
        <div class="col q-pl-xs border-black label-max-width row items-center f-multiline">{{ item['OrgName'] }}</div>
        <div class="col-2 row text-center">
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateFrom']).str }}</div>
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateTo']).str }}</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ !item['NoHours'] ? 'N/A' : item['NoHours'] }}</div>
        <div class="col border-black row items-center q-pl-xs f-multiline" :style="`font-size:${measure(item.OrgPosition, 90, 120)}px`">{{ item['OrgPosition'] }}</div>
      </div>

      <template v-if="maxExtra.volunteerings-extraVolunteerings.length > 0">
        <div v-for="n in (maxExtra.volunteerings - extraVolunteerings.length)" class="col-12 row no-wrap label-max-height" :key="`emptyExtraVolunt${n}`">
          <div v-if="n === 1" class="col q-pl-xs border-black label-max-width text-italic f-field row flex-center" >**NOTHING FOLLOWS**</div>
          <div v-else class="col q-pl-xs border-black label-max-width" />
          <div class="col-2 row">
            <div class="col-6 border-black q-py-xs text-center" />
            <div class="col-6 border-black q-py-xs text-center" />
          </div>
          <div class="col-1 border-black column flex-center" />
          <div class="col border-black row item-center q-pl-xs" />
        </div>
      </template>


      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('trainings')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE VOLUNTEERINGS -->


    <!-- region PAGE INTERVENTIONS -->
    <div class="col-12 row q-px-md q-pt-lg" v-if="!!extraInterventions.length" style="aspect-ratio: 1/1.52">
      <div class="col-12 bg-grey-6 border-black text-weight-bold text-italic q-pl-xs text-weight-bold text-italic" style="font-size: small">VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING PROGRAMS ATTENDED</div>

      <div class="col-12 row bg-grey-5">
        <div class="col row border-black label-max-width">
          <div class="col-shrink q-py-sm q-pl-sm text-right">30.</div>
          <div class="col row items-center text-left q-py-sm q-px-xs text-center f-multiline">TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING PROGRAMS<br/>(Write in full)</div>
        </div>
        <div class="col-2 row text-center f-multiline">
          <div class="col-12 border-black row flex-center q-py-sm q-px-xs text-center f-multiline">INCLUSIVE DATES<br/>(mm/dd/yyyy)</div>
          <div class="col-6 border-black q-py-xs text-center">From</div>
          <div class="col-6 border-black q-py-xs text-center">To</div>
        </div>
        <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width:40px">NO. OF HOURS</div>
        <div class="col-1 border-black column flex-center text-center f-multiline">Type of LD<br/>(Managerial / Supervisory / Technical / etc)</div>
        <div class="col-3 border-black column flex-center text-center f-multiline">CONDUCTED/SPONSORED BY<br/>(Write in full)</div>
      </div>
      <div v-for="(item, n) in extraInterventions" class="col-12 row label-max-height text-uppercase" :key="`extraTrain${n}`">
        <div class="col row border-black label-max-width">
          <div class="col-shrink row items-center text-left q-px-xs f-field f-multiline" :style="`font-size: ${ measure(item.Training) }px`">{{ item['Training'] }}</div>
        </div>
        <div class="col-2 row f-multiline">
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateFrom']).str }}</div>
          <div class="col-6 border-black q-py-xs text-center">{{ createDate(item['DateTo']).str }}</div>
        </div>
        <div class="col-1 border-black column justify-center text-right q-pr-xs f-multiline" style="max-width: 40px">{{ item['NumHours'] }}</div>
        <div class="col-1 border-black column flex-center text-center f-multiline">{{ item['type'] }}</div>
        <div class="col-3 border-black row items-center text-left q-px-xs f-field f-multiline" :style="`font-size: ${ measure(item.Conductor, 60, 90) }px`">{{ item['Conductor'] }}</div>
      </div>
      <template v-if="maxExtra.interventions-extraInterventions.length > 0">
        <div v-for="n in (maxExtra.interventions - extraInterventions.length)" class="col-12 row label-max-height" :key="`emptyExtraTrain${n}`">
          <div class="col row border-black label-max-width">
            <div v-if="n === 1" class="col row flex-center q-py-sm q-px-xs  text-italic f-field text-center f-multiline">**NOTHING FOLLOWS**</div>
            <div v-else class="col row items-center text-left q-py-sm q-px-xs text-center f-multiline"/>
          </div>
          <div class="col-2 row f-multiline">
            <div class="col-6 border-black q-py-xs text-center"/>
            <div class="col-6 border-black q-py-xs text-center"/>
          </div>
          <div class="col-1 border-black column flex-center text-center f-multiline" style="max-width: 40px"/>
          <div class="col-1 border-black column flex-center text-center f-multiline"/>
          <div class="col-3 border-black column flex-center text-center f-multiline"/>
        </div>
      </template>


      <div class="col-12 row no-wrap border-black label-max-height">
        <div class="col-shrink border-black label-max-width row no-wrap flex-center text-weight-bold" style="font-size: small">SIGNATURE</div>
        <div class="col" style="max-width: 120px"/>
        <div class="col-grow"/>
        <div class="col-1 border-black row no-wrap flex-center text-weight-bold" style="font-size: small">DATE</div>
        <div class="col" style="max-width: 80px"/>
        <div class="col-1" style="max-width:62px"/>
        <div class="col" style="max-width:120px"/>
      </div> <!-- SIGNATURE -->

      <div class="col-12 row reverse text-italic text-weight-light q-pt-xs">CS FORM 212 (Revised 2017), Page {{ state.pageCount.indexOf('trainings')+1 }} of {{ state.pageCount.length }}</div>
    </div><!-- endregion PAGE INTERVENTIONS -->


  </div>

</template>

<style scoped>
div {
  font-size: xx-small;
  span {
    font-size: xx-small;
  }
}

#contentPersonalData {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  width: 100%;
  aspect-ratio: 1/1.52;
}
td {
  padding: 0 !important;
  margin: 0 !important;
  min-height: 18px !important;
}

.border-black {
  border: thin solid black;
}

.border-black-x {
  border-left: thin solid black;
  border-right: thin solid black;
}

.border-black-y {
  border-top: thin solid black;
  border-bottom: thin solid black;
}

.label-max-width {
  min-width:150px;
}
.label-max-height {
  height: 26px;
  max-height: 26px;
}
.f-field {
  font-size: x-small;
}

.f-multiline {
  line-height: 86%;
}
</style>
