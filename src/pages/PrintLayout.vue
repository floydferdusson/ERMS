<!--suppress CssInvalidPropertyValue -->
<template>
  <div style="width: 70%" class="align">
    <div class="q-pa-xl align-center justify-center">
      <div id="btn-group" class="mx-auto w-75 mt-2">
        <q-btn class="bg-green" @click="print"> Print </q-btn>
      </div>
      <div
        class="d-flex flex-column w-75 mx-auto"
        id="print-area"
        style="letter-spacing: 0.02em"
      >
        <table class="table">
          <tr>
            <td colspan="10">
              CS Form
              <p>Revision 2018</p>
            </td>
          </tr>
          <tr>
            <td class="text-center" colspan="10">
              <h3
                class="title"
                style="margin-top: 0; margin-bottom: 0; font-weight: 50px"
              >
                PERSONAL DATA SHEET
              </h3>
            </td>
          </tr>
          <tr>
            <td colspan="10">
              <b>WARNING:</b> Any misrepresentation made in the Personal Data
              Sheet and the Work Experience Sheet shall cause the filing of
              administrative/criminal case/s against the person concerned.
            </td>
          </tr>
          <tr>
            <td colspan="10">
              READ THE ATTACHED GUIDE TO FILLING OUT THE PERSONAL DATA SHEET
              (PDS) BEFORE ACCOMPLISHING THE PDS FORM.
            </td>
          </tr>
          <tr>
            <td colspan="8">
              Print legibly. Tick appropriate boxes ( ) and use separate sheet
              if necessary. Indicate N/A if not applicable.
              <b>DO NOT ABBREVIATE.</b>
            </td>
            <td colspan="1" class="number">1. CS ID No.</td>
            <td colspan="1">(Do not fill up. For CSC use only)</td>
          </tr>
          <tr>
            <td class="numerical" colspan="10">I. PERSONAL INFORMATION</td>
          </tr>
          <tr>
            <td colspan="2" class="number">2. SURNAME</td>
            <td colspan="8" class="">{{ personal[0].Surname }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-5">&nbsp;&nbsp; FIRSTNAME</p>
            </td>
            <td colspan="7">{{ personal[0].Firstname }}</td>
            <td colspan="1" class="number photoCenter">
              NAME EXTENSION (JR., SR.) {{ model }}
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-5">&nbsp;&nbsp;MIDDLE NAME</p>
            </td>
            <td colspan="8">{{ personal[0].MIddlename }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">3. DATE OF BIRTH</td>
            <td colspan="3">{{ personal[0].Bday }}</td>
            <td colspan="3" rowspan="3" class="number">
              16. CITIZENSHIP

              <p class="text-center">If holder of dual citizenship,</p>

              <p class="text-center">please indicate the details</p>
            </td>
            <td colspan="2" rowspan="2">
              <v-col>
                {{ personal[0].Citizenship }}
                <br />
                {{ personal[0].citizenshipStatus }}
                <br />
                {{ personal[0].birthcountry }}
              </v-col>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">4. Place of Birth</td>
            <td colspan="3">{{ personal[0].BirthPlace }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">5. Sex</td>
            <td colspan="3">
              {{ personal[0].Sex }}
            </td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td colspan="2" rowspan="2" class="number">6. CIVIL STATUS</td>
            <td colspan="3" rowspan="2">
              {{ personal[0].CivilStatus }}
            </td>
            <td colspan="2" rowspan="3" class="number">
              17.
              <p class="textCenter q-ml-lg">RESIDENTIAL ADDRESS</p>
            </td>
            <td colspan="3">
              <p style="margin-right: 10px">
                {{ personal[0].Phouse }}&nbsp; , &nbsp;
                {{ personal[0].Pstreet }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -10px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                House/Block/Lot No.
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -3px;
                  margin-top: -10px;
                  margin-left: 60%;
                  font-style: italic;
                "
              >
                Street
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="3">
              <p style="margin-right: 10px">
                {{ personal[0].Psubdivision }}&nbsp; , &nbsp;
                {{ personal[0].Pbarangay }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -5px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                Subdivision/Village
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -2px;
                  margin-left: 60%;
                  margin-top: -10px;
                  font-style: italic;
                "
              >
                Barangay
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">7. HEIGHT (m)</td>
            <td colspan="3">{{ personal[0].Heights }} m</td>
            <td colspan="5">
              <p style="margin-right: 10px">
                {{ personal[0].Pcity }}&nbsp; , &nbsp;
                {{ personal[0].Pprovince }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -30px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                City/Municipality
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-left: 60%;
                  font-style: italic;
                  margin-top: 18px;
                  margin-bottom: -0px;
                "
              >
                Province
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">8. WEIGHT (kg)</td>
            <td colspan="3">{{ personal[0].Weights }} kg</td>
            <td colspan="2" class="number"><p class="ml-6">ZIP CODE</p></td>
            <td colspan="3">{{ personal[0].Pzip }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">9. BLOOD TYPE</td>
            <td colspan="3">{{ personal[0].BloodType }}</td>
            <td colspan="2" rowspan="3" class="number">
              18.
              <p class="textCenter q-ml-lg">PERMANENT ADDRESS</p>
            </td>
            <td colspan="3">
              <p style="margin-right: 10px">
                {{ personal[0].Phouse }}&nbsp; , &nbsp;
                {{ personal[0].Pstreet }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -10px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                House/Block/Lot No.
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -3px;
                  margin-top: -10px;
                  margin-left: 60%;
                  font-style: italic;
                "
              >
                Street
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">10. GSIS ID NO.</td>
            <td colspan="3">{{ personal[0].GSISNo }}</td>
            <td colspan="3">
              <p style="margin-right: 10px">
                {{ personal[0].Psubdivision }}&nbsp; , &nbsp;
                {{ personal[0].Pbarangay }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -5px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                Subdivision/Village
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -2px;
                  margin-left: 60%;
                  margin-top: -10px;
                  font-style: italic;
                "
              >
                Barangay
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">11. PAG-IBIG ID NO.</td>
            <td colspan="3">{{ personal[0].PAGIBIGNo }}</td>
            <td colspan="5">
              <p style="margin-right: 10px">
                {{ personal[0].Pcity }}&nbsp; , &nbsp;
                {{ personal[0].Pprovince }}
              </p>
              <q-separator style="margin-top: -15px"> </q-separator>
              <p
                style="
                  font-size: 8px;
                  margin-bottom: -30px;
                  margin-left: 10%;
                  font-style: italic;
                "
              >
                City/Municipality
              </p>
              <p
                style="
                  font-size: 8px;
                  margin-left: 60%;
                  font-style: italic;
                  margin-top: 18px;
                  margin-bottom: -0px;
                "
              >
                Province
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="2" class="number">12. PHILHEALTH NO.</td>
            <td colspan="3">{{ personal[0].PHEALTHNo }}</td>
            <td colspan="2" class="number"><p class="ml-6">ZIP CODE</p></td>
            <td colspan="3">{{ personal[0].Pzip }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">13. SSS NO.</td>
            <td colspan="3">{{ personal[0].SSSNo }}</td>
            <td colspan="2" class="number">
              19.
              <p class="textCenter q-ml-lg">TELEPHONE NO.</p>
            </td>
            <td colspan="3">{{ personal[0].TelNo }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">14. TIN NO.</td>
            <td colspan="3">{{ personal[0].TINNo }}</td>
            <td colspan="2" class="number">20. MOBILE NO.</td>
            <td colspan="3">{{ personal[0].CellphoneNo }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">15. AGENCY EMPLOYEE NO.</td>
            <td colspan="3">{{ personal[0].ControlNo }}</td>
            <td colspan="2" class="number">
              21.
              <p class="textCenter q-ml-lg">E-MAIL ADDRESS (if any)</p>
            </td>
            <td colspan="3">{{ personal[0].EmailAdd }}</td>
          </tr>

          <!-- FAMILY BACKGROUND -->
          <tr>
            <td class="numerical" colspan="10">II. FAMILY BACKGROUND</td>
          </tr>
          <tr>
            <td colspan="2" class="number">22. SPOUSE'S SURNAME</td>
            <td colspan="3">{{ personal[0].SpouseName }}</td>
            <td colspan="4" class="number">
              23.
              <p class="textCenter q-ml-lg">
                NAME of CHILDREN (Write full name and list all)
              </p>
            </td>
            <td colspan="1" class="number">DATE OF BIRTH (mm/dd/yy)</td>
          </tr>
          <tr>
            <td colspan="2" class="number">&nbsp;&nbsp; FIRST NAME</td>
            <td colspan="2" class="">{{ personal[0].SpouseFirstname }}</td>
            <td colspan="1" class="number photoCenter">
              NAME EXTENSION (JR., SR.) {{ model }}
            </td>
            <td colspan="4">
              {{ children[0] }}
            </td>

            <td colspan="1">
              {{ childbdate[0] }}
            </td>
          </tr>
          <tr></tr>
          <tr>
            <td colspan="2" class="number">&nbsp;&nbsp; MIDDLE NAME</td>
            <td colspan="3">{{ personal[0].SpouseMiddlename }}</td>
            <td colspan="4">{{ children[1] }}</td>
            <td colspan="1">{{ childbdate[1] }}</td>
          </tr>

          <tr>
            <td colspan="2" class="number q-ml-md">&nbsp;&nbsp; OCCUPATION</td>
            <td colspan="3">{{ personal[0].Occupation }}</td>
            <td colspan="4">{{ children[2] }}</td>
            <td colspan="1">{{ childbdate[2] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number q-ml-md">
              &nbsp;&nbsp; EMPLOYER / BUSINESS NAME
            </td>
            <td colspan="3">{{ personal[0].SpouseEmployer }}</td>
            <td colspan="4">{{ children[3] }}</td>
            <td colspan="1">{{ childbdate[3] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">&nbsp;&nbsp; BUSINESS ADDRESS</td>
            <td colspan="3">{{ personal[0].SpouseEmpAddress }}</td>
            <td colspan="4">{{ children[4] }}</td>
            <td colspan="1">{{ childbdate[4] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">&nbsp;&nbsp; TELEPHONE NO.</td>
            <td colspan="3">{{ personal[0].SpouseEmpTel }}</td>
            <td colspan="4">{{ children[5] }}</td>
            <td colspan="1">{{ childbdate[5] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">24. FATHER'S SURNAME</td>
            <td colspan="3">{{ personal[0].FatherName }}</td>
            <td colspan="4">{{ children[6] }}</td>
            <td colspan="1">{{ childbdate[6] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-6">&nbsp;&nbsp; FIRST NAME</p>
            </td>
            <td colspan="2">{{ personal[0].FatherFirstname }}</td>
            <td colspan="1" class="number photoCenter">
              NAME EXTENSION (JR., SR.) {{ model }}
            </td>
            <td colspan="4">{{ children[7] }}</td>
            <td colspan="1">{{ childbdate[7] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-6">&nbsp;&nbsp; MIDDLE NAME</p>
            </td>

            <td colspan="3">{{ personal[0].FatherMiddlename }}</td>
            <td colspan="4">{{ children[8] }}</td>
            <td colspan="1">{{ childbdate[8] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">25. MOTHER'S MAIDEN NAME</td>
            <td colspan="3">{{ personal[0].MotherFirstname }}</td>
            <td colspan="4">{{ children[9] }}</td>
            <td colspan="1">{{ childbdate[9] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-6">&nbsp;&nbsp; SURNAME</p>
            </td>
            <td colspan="3">{{ personal[0].MotherName }}</td>
            <td colspan="4">{{ children[10] }}</td>
            <td colspan="1">{{ childbdate[10] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-6">&nbsp;&nbsp; FIRST NAME</p>
            </td>
            <td colspan="3">{{ personal[0].MotherFirstname }}</td>
            <td colspan="4">{{ children[11] }}</td>
            <td colspan="1">{{ childbdate[11] }}</td>
          </tr>
          <tr>
            <td colspan="2" class="number">
              <p class="ml-6">&nbsp;&nbsp; MIDDLE NAME</p>
            </td>
            <td colspan="3">{{ personal[0].MotherMiddlename }}</td>
            <td colspan="5" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>

          <!-- EDUCATIONAL BACKGROUND -->
          <tr>
            <td class="numerical" colspan="10">III. EDUCATIONAL BACKGROUND</td>
          </tr>
          <tr class="textCenter">
            <td colspan="1" rowspan="2" class="number">26. LEVEL</td>
            <td colspan="3" rowspan="2">NAME OF SCHOOL</td>
            <td colspan="1" rowspan="2">BASIC EDUCATION / DEGREE/ COURSE</td>
            <td colspan="2">PERIOD OF ATTENDANCE</td>
            <td colspan="1" rowspan="2">
              HIGHEST LEVEL/UNITS EARNED (if not graduated)
            </td>
            <td colspan="1" rowspan="2">YEAR GRADUATED</td>
            <td colspan="1" rowspan="2">
              SCHOLARSHIP/ACADEMIC HONORS RECEIVED
            </td>
          </tr>
          <tr class="textCenter">
            <td colspan="1">From</td>
            <td colspan="1">To</td>
          </tr>
          <tr v-for="education in store.usereducation" :key="education">
            <td colspan="1">{{ education.Education }}</td>
            <td colspan="3">{{ education.School }}</td>
            <td colspan="1">{{ education.Degree }}</td>
            <td colspan="1">
              {{ (education.From = education.DateAttend.slice(0, 4)) }}
            </td>
            <td colspan="1">
              {{ (education.To = education.DateAttend.slice(6)) }}
            </td>
            <td colspan="1">{{ education.NumUnits }}</td>
            <td colspan="1">{{ (education.yeargraduated = education.To) }}</td>
            <td colspan="1">{{ education.Honors }}</td>
          </tr>

          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td colspan="2" class="centerStyle">SIGNATURE</td>
            <td colspan="3">Test</td>
            <td colspan="2" class="centerStyle">DATE</td>
            <td colspan="3">Test</td>
          </tr>
          <tr>
            <td class="footer" colspan="10">
              CS FORM 212 (Revised 2017), Page 1 of 4
            </td>
          </tr>
          <div class="page-break"></div>
          <!-- IV. CIVIL SERVICE ELIGIBILITY -->
          <tr>
            <td class="numerical" colspan="10">
              IV. CIVIL SERVICE ELIGIBILITY
            </td>
          </tr>
          <tr class="number">
            <td colspan="3" rowspan="2">
              27.
              <p class="q-ml-md textCenter">
                CAREER SERVICE/ RA 1080 (BOARD/ BAR) UNDER SPECIAL LAWS/ CES/
                CSEE BARANGAY ELIGIBILITY / DRIVER'S LICENSE
              </p>
            </td>
            <td colspan="1" rowspan="2" class="textCenter">
              "RATING (If Applicable)"
            </td>
            <td colspan="1" rowspan="2" class="textCenter">
              DATE OF EXAMINATION / CONFERMENT
            </td>
            <td colspan="3" rowspan="2" class="textCenter">
              PLACE OF EXAMINATION / CONFERMENT
            </td>
            <td colspan="2" class="textCenter">LICENSE (if applicable)</td>
          </tr>
          <tr class="number textCenter">
            <td colspan="1">NUMBER</td>
            <td colspan="1">Date of Validity</td>
          </tr>
          <tr
            v-for="(eligibility, index) in displayedEligibility"
            :key="index"
            style="height: 20px"
          >
            <td colspan="3">{{ eligibility.CivilServe }}</td>
            <td colspan="1">{{ eligibility.Rates }}</td>
            <td colspan="1">{{ eligibility.Dates }}</td>
            <td colspan="3">{{ eligibility.Place }}</td>
            <td colspan="1">{{ eligibility.LNumber }}</td>
            <td colspan="1">{{ eligibility.LDate }}</td>
          </tr>
          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td class="numerical" colspan="10">
              V. WORK EXPERIENCE
              <p>
                (Include private employment. Start from your recent work)
                Description of duties should be indicated in the attached Work
                Experience sheet.
              </p>
            </td>
          </tr>
          <tr class="number">
            <td colspan="2" rowspan="">
              28.
              <p class="textCenter">INCLUSIVE DATES (mm/dd/yyyy)</p>
            </td>
            <td colspan="2" rowspan="2" class="textCenter">
              POSITION TITLE (Write in full/Do not abbreviate)
            </td>
            <td colspan="2" rowspan="2" class="textCenter">
              DEPARTMENT / AGENCY / OFFICE / COMPANY (Write in full/Do not
              abbreviate)
            </td>
            <td colspan="1" rowspan="2" class="textCenter">MONTHLY SALARY</td>
            <td colspan="1" rowspan="2" class="textCenter">
              SALARY/ JOB/ PAY GRADE (if applicable)& STEP (Format "00-0")/
              INCREMENT
            </td>
            <td colspan="1" rowspan="2" class="textCenter">
              STATUS OF APPOINTMENT
            </td>
            <td colspan="1" rowspan="2" class="textCenter">
              GOV'T SERVICE (Y/ N)
            </td>
          </tr>
          <tr class="number textCenter">
            <td colspan="1">From</td>
            <td colspan="1">To</td>
          </tr>
          <tr
            v-for="(experience, index) in displayedExperience"
            :key="index"
            style="height: 20px"
          >
            <td colspan="1">{{ experience.wfrom }}</td>
            <td colspan="1">{{ experience.wto }}</td>
            <td colspan="2">{{ experience.wposition }}</td>
            <td colspan="2">{{ experience.wcompany }}</td>
            <td colspan="1">{{ experience.wsalary }}</td>
            <td colspan="1">{{ experience.wgrade }}</td>
            <td colspan="1">{{ experience.status }}</td>
            <td colspan="1">{{ experience.wgov }}</td>
          </tr>
          <!-- <tr v-for="experience in store.userexperience" :key="experience">

          </tr> -->
          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td colspan="2" class="centerStyle">SIGNATURE</td>
            <td colspan="3">Test</td>
            <td colspan="2" class="centerStyle">DATE</td>
            <td colspan="3">Test</td>
          </tr>
          <tr>
            <td class="footer" colspan="10">
              CS FORM 212 (Revised 2017), Page 2 of 4
            </td>
          </tr>
          <div class="page-break"></div>

          <!-- VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT / PEOPLE / VOLUNTARY ORGANIZATION/S -->

          <tr>
            <td class="numerical" colspan="10">
              VI. VOLUNTARY WORK OR INVOLVEMENT IN CIVIC / NON-GOVERNMENT /
              PEOPLE / VOLUNTARY ORGANIZATION/S
            </td>
          </tr>
          <tr class="number">
            <td colspan="4" rowspan="2">
              29.
              <p class="textCenter">
                NAME & ADDRESS OF ORGANIZATION <br />(Write in full)
              </p>
            </td>
            <td colspan="2" class="textCenter">INCLUSIVE DATES (mm/dd/yyyy)</td>
            <td colspan="1" rowspan="2" class="textCenter">NUMBER OF HOURS</td>
            <td colspan="3" rowspan="2" class="textCenter">
              POSITION / NATURE OF WORK
            </td>
          </tr>
          <tr class="number textCenter">
            <td colspan="1">From</td>
            <td colspan="1">To</td>
          </tr>
          <tr
            v-for="(voluntary, index) in displayVoluntary"
            :key="index"
            style="height: 20px"
          >
            <td colspan="4">{{ voluntary.name }}</td>
            <td colspan="1">{{ voluntary.InclusiveDateFrom }}</td>
            <td colspan="1">{{ voluntary.InclusiveDateTo }}</td>
            <td colspan="1">{{ voluntary.NumberofHours }}</td>
            <td colspan="3">{{ voluntary.Position }}</td>
          </tr>
          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td class="numerical" colspan="10">
              VII. LEARNING AND DEVELOPMENT (L&D) INTERVENTIONS/TRAINING
              PROGRAMS ATTENDED
              <p>
                (Start from the most recent L&D/training program and include
                only the relevant L&D/training taken for the last five (5) years
                for Division Chief/Executive/Managerial positions)
              </p>
            </td>
          </tr>

          <tr class="number">
            <td colspan="4" rowspan="2">
              30.
              <p class="q-ml-lg textCenter">
                TITLE OF LEARNING AND DEVELOPMENT INTERVENTIONS/TRAINING
                PROGRAMS (Write in full)
              </p>
            </td>
            <td colspan="2" class="textCenter">
              INCLUSIVE DATES OF ATTENDANCE (mm/dd/yyyy)
            </td>
            <td colspan="1" rowspan="2" class="textCenter">NUMBER OF HOURS</td>
            <td colspan="1" rowspan="2" class="textCenter">
              "Type of LD ( Managerial/ Supervisory/ Technical/etc) "
            </td>
            <td colspan="2" rowspan="2" class="textCenter">
              CONDUCTED/ SPONSORED BY (Write in full)
            </td>
          </tr>
          <tr class="number textCenter">
            <td colspan="1">From</td>
            <td colspan="1">To</td>
          </tr>
          <tr
            v-for="(learning, index) in displayedLearning"
            :key="index"
            style="height: 20px"
          >
            <td colspan="4">{{ learning.Training }}</td>
            <td colspan="1">{{ learning.DateFrom }}</td>
            <td colspan="1">{{ learning.DateTo }}</td>
            <td colspan="1">{{ learning.NumHours }}</td>
            <td colspan="1">{{ learning.type }}</td>
            <td colspan="2">{{ learning.Conductor }}</td>
          </tr>
          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td class="numerical" colspan="10">VIII. OTHER INFORMATION</td>
          </tr>
          <tr class="number">
            <td colspan="3">
              31.
              <p class="textCenter">SPECIAL SKILLS and HOBBIES</p>
            </td>
            <td colspan="4">
              32.
              <p class="textCenter">
                NON-ACADEMIC DISTINCTIONS / RECOGNITION <br />(Write in full)
              </p>
            </td>
            <td colspan="3">
              33.
              <p class="textCenter">
                MEMBERSHIP IN ASSOCIATION/ORGANIZATION <br />(Write in full)
              </p>
            </td>
          </tr>
          <tr
            v-for="(skills, index) in displayedOther"
            :key="index"
            style="height: 20px"
          >
            <td colspan="3">{{ skill.SkillsandHobbies }}</td>
            <td colspan="4">{{ academic.NonAcademic }}</td>
            <td colspan="3">{{ organization.Membership }}</td>
          </tr>
          <tr>
            <td colspan="10" class="red">
              (Continue on separate sheet if necessary)
            </td>
          </tr>
          <tr>
            <td colspan="2" class="centerStyle">SIGNATURE</td>
            <td colspan="3">Test</td>
            <td colspan="2" class="centerStyle">DATE</td>
            <td colspan="3">Test</td>
          </tr>
          <tr>
            <td class="footer" colspan="10">
              CS FORM 212 (Revised 2017), Page 3 of 4
            </td>
          </tr>
          <div class="page-break"></div>

          <!-- ;4th page -->
          <tr>
            <td colspan="7" class="number">
              34.
              <p class="ml-12 mt-n6">
                Are you related by consanguinity or affinity to the appointing
                or recommending authority, or to the chief of bureau or office
                or to the person who has immediate supervision over you in the
                Office, Bureau or Department where you will be apppointed,
              </p>
            </td>
            <td colspan="3"></td>
          </tr>

          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp;a. within the third degree?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q1 }}
            </td>
          </tr>

          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp;b. within the fourth degree (for Local
              Government Unit - Career Employees)?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q11 }}
              <p class="margin" style="">
                &nbsp;&nbsp;
                {{ personal[0].R11 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              35. a. Have you ever been found guilty of any administrative
              offense?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q4 }}
              <p class="margin" style="">
                {{ personal[0].R4 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp; b. Have you been criminally charged
              before any court?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q7 }}
              <p class="margin">
                {{ personal[0].R7 }}
                <br />&nbsp;&nbsp; Date Filed: {{ personal[0].R7 }}
                <br />&nbsp;&nbsp; Status of Case/s: : {{ personal[0].R7 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              36.
              <p class="ml-12 mt-n6">
                Have you ever been convicted of any crime or violation of any
                law, decree, ordinance or regulation by any court or tribunal?
              </p>
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q3 }}
              <p class="margin" style="">
                {{ personal[0].R3 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              37.
              <p class="ml-12 mt-n6">
                Have you ever been separated from the service in any of the
                following modes: resignation, retirement, dropped from the
                rolls, dismissal, termination, end of term, finished contract or
                phased out (abolition) in the public or private sector?
              </p>
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q5 }}
              <p class="margin" style="">
                {{ personal[0].R5 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              38. a.
              <p class="ml-12 mt-n6">
                Have you ever been a candidate in a national or local election
                held within the last year (except Barangay election)?
              </p>
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].Q6 }}
              <p class="margin" style="">
                {{ personal[0].R6 }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp; b.
              <p class="ml-12 mt-n6">
                Have you resigned from the government service during the three
                (3)-month period before the last election to promote/actively
                campaign for a national or local candidate?
              </p>
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].local }}
              <p class="margin" style="">
                {{ personal[0].localdetails }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              39.
              <p class="ml-8 mt-n6">
                Have you acquired the status of an immigrant or permanent
                resident of another country?
              </p>
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].country }}
              <p class="margin" style="">
                {{ personal[0].countrydetails }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              40.
              <p class="ml-8 mt-n6">
                Pursuant to: (a) Indigenous People's Act (RA 8371); (b) Magna
                Carta for Disabled Persons (RA 7277); and (c) Solo Parents
                Welfare Act of 2000 (RA 8972), please answer the following
                items:
              </p>
            </td>
            <td colspan="3"></td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp; a. Are you a member of any indigenous
              group?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].IP }}
              <p class="margin" style="">
                {{ personal[0].IPR }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp; b. Are you a person with disability?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].PWD }}
              <p class="margin" style="">
                {{ personal[0].Psychosocial }}
                {{ personal[0].Chronic }}
                {{ personal[0].Learning }}
                {{ personal[0].Mental }}
                {{ personal[0].Visual }}
                {{ personal[0].Orthopedic }}
                {{ personal[0].Communication }}
              </p>
            </td>
          </tr>
          <tr>
            <td colspan="7" class="number">
              &nbsp; &nbsp; &nbsp; &nbsp; c. Are you a solo parent?
            </td>
            <td colspan="3">
              &nbsp;&nbsp;
              {{ personal[0].SoloP }}
            </td>
          </tr>
          <tr>
            <td colspan="8" class="number">
              41. REFERENCES
              <span class="red"
                >(Person not related by consanguinity or affinity to applicant
                /appointee)</span
              >
            </td>
            <td colspan="2" rowspan="6">
              <div class="box">
                <!-- <q-img
                  :src="imageUrlPDS"
                  spinner-color="white"
                  style="
                    height: 8in;
                    max-width: 8in;

                    border-radius: 10%;
                    border-width: 2%;
                    border-style: solid;
                  "
                ></q-img> -->
                <p>
                  ID picture taken within the last 6 months 3.5 cm. X 4.5 cm
                  (passport size)
                </p>
                <p>
                  With full and handwritten name tag and signature over printed
                  name
                </p>
                <p>
                  Computer generated or photocopied picture is not acceptable
                </p>
              </div>
              <p class="photoCenter">PHOTO</p>
            </td>
          </tr>
          <tr class="numberCenter">
            <td colspan="4">NAME</td>
            <td colspan="3">ADDRESS</td>
            <td colspan="1">TEL NO.</td>
          </tr>
          <tr v-for="index in 3" :key="'empty-' + index">
            <td colspan="4">&nbsp;</td>
            <td colspan="3">&nbsp;</td>
            <td colspan="1">&nbsp;</td>
          </tr>
          <tr>
            <td colspan="8" class="number">
              42.
              <p class="ml-8 mt-n6">
                I declare under oath that I have personally accomplished this
                Personal Data Sheet which is a true, correct and complete
                statement pursuant to the provisions of pertinent laws, rules
                and regulations of the Republic of the Philippines. I authorize
                the agency head/authorized representative to verify/validate the
                contents stated herein. I agree that any misrepresentation made
                in this document and its attachments shall cause the filing of
                administrative/criminal case/s against me.
              </p>
            </td>
          </tr>

          <div class="boxed-table">
            <v-table>
              <tr>
                <td colspan="3" class="dark number">
                  Government Issued ID (i.e. Passport, GSIS, SSS, PRC, Driver's
                  License, etc.) PLEASE INDICATE ID Number and Date of Issuance
                </td>
              </tr>
              <tr>
                <td colspan="4" class="dark">Government Issued ID:</td>
              </tr>
              <tr>
                <td colspan="4" class="dark">
                  Signature (Sign inside the box)
                </td>
              </tr>
              <tr>
                <td colspan="4" class="dark">Date/Place of Issuance:</td>
              </tr>
            </v-table>
          </div>

          <div class="boxed table2">
            <v-table>
              <tr>
                <td colspan="4" class="sign"></td>
              </tr>
              <tr>
                <td colspan="4" class="numberCenter">Signature</td>
              </tr>
              <tr>
                <td colspan="4" class="dark"></td>
              </tr>
              <tr>
                <td colspan="4" class="numberCenter">Date Accomplished</td>
              </tr>
            </v-table>
          </div>

          <div class="boxed3 table3">
            <v-table>
              <tr>
                <td colspan="2" class="thumb"></td>
              </tr>
              <tr>
                <td colspan="2" class="numberCenter">Right Thumb</td>
              </tr>
            </v-table>
          </div>

          <tr>
            <td colspan="10">
              <p class="photoCenter">
                SUBSCRIBED AND SWORN to before me this
                __________________________ , affiant exhibiting his/her validly
                issued government ID as indicated above.
              </p>
            </td>
          </tr>

          <div class="boxed4 table4">
            <v-table>
              <tr>
                <td colspan="5" class="sign"></td>
              </tr>
              <tr>
                <td colspan="5" class="numberCenter">
                  Person Administering Oath
                </td>
              </tr>
            </v-table>
          </div>
          <tr>
            <td class="footer" colspan="10">
              CS FORM 212 (Revised 2017), Page 4 of 4
            </td>
          </tr>
        </table>

        <div class="page-break"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from "vue";
// import axios from "axios";
import { useLoginStore } from "src/stores/LoginStore";
import { useUserInfoStore } from "src/stores/AdditionalStore";
// import {jsPDF} from "jspdf";
import { server } from "boot/axios";

export default {
  data() {
    return {
      users: [],
      personal: [],
      skill: [],
      academic: [],
      organization: [],
      children: [],
      childbdate: [],
      skiller: [],
      pdf: "",
      // education:[],
    };
  },
  created() {
    const userstore = useLoginStore();
    this.skill = userstore.userinfo;
    this.academic = userstore.userinfo;
    this.organization = userstore.userinfo;
    this.personal = userstore.userinfo.map((item) => ({ ...item }));
    if (
      this.personal[0].Surname.includes("JR") ||
      this.personal[0].Surname.includes("SR") ||
      this.personal[0].Surname.includes(" III") ||
      this.personal[0].Surname.includes(" IV")
    ) {
      this.personal[0].Surname.replace(/\s(Jr|Sr|III| IV)$/, "");
      const regex = /\s(Jr|Sr|III| IV)$/;
      const matches = this.personal[0].Surname.match(regex);
      this.model = matches.slice(1);
    } else {
      this.model = "N/A";
    }
    this.cit = this.personal[0].Citizenship;

    if (this.personal[0].citizenshipStatus == "") {
      this.personal[0].citizenshipStatus = "byBirth";
    }
    console.log("personal = ", this.personal);
    console.log("work experience=", userstore.experience);
    // for(let i=0;i < this.personal[0].children.length;i++){
    //   this.children[i]=this.personal[0].Children[i]?this.personal[0].children[i].ChildName :''
    //   this.childbdate[i]=this.personal[0].Children[i]?this.personal[0].children[i].BirthDate : ''
    //   // console.log("children=",this.personal[0].children[i].ChildName)
    // }
    this.children = Array(12)
      .fill("")
      .map((_, i) => {
        const child = this.personal[0].children[i];
        return child ? child.ChildName : "";
      });
    this.childbdate = Array(12)
      .fill("")
      .map((_, i) => {
        const child = this.personal[0].children[i];
        return child ? child.BirthDate : "";
      });

    // this.skiller = Array (7)
    // .fill("")
    // .map((_,i) => {
    //   const skill1 = this.skills[0].SkillsandHobbies[i];
    //   return skill1 ? skill1.SkillsandHobbies : "";
    // })

    console.log("children=", this.children[0]);
    // console.log("education=", this.education[0])

    //for work exp
    const userinfostore = useUserInfoStore();

    let data = new FormData();
    data.append("controlno", userstore.controlno);
    userinfostore.getworkexp(data).then((res) => {
      // console.log("service record=", userinfostore.userexperience);
      // console.log("experience=", this.personal);
      let servicerecord = userinfostore.workexp;

      servicerecord.forEach((item) => {
        if (
          !userstore.userexperience.some(
            (existingItem) => existingItem.wposition == item.wposition
          )
        ) {
          userstore.userexperience.push(item);
        }
      });
      // console.log("experience=",this.personal)
    });
  },
  computed: {
    displayedOther() {
      const defaultRows = Array.from(
        { length: 5 - this.store.userskills.length },
        (_, index) => ({})
      );
      return [...this.store.userskills, ...defaultRows];
    },
    displayedEligibility() {
      const defaultRows = Array.from(
        { length: 16 - this.store.usereligibility.length },
        (_, index) => ({
          CivilServe: "",
          Rates: "",
          Dates: "",
          Place: "",
          LNumber: "",
          LDate: "",
        })
      );
      return [...this.store.usereligibility, ...defaultRows];
    },

    displayedExperience() {
      const defaultRows = Array.from(
        { length: 42 - this.store.userexperience.length },
        (_, index) => ({
          wfrom: "",
          wto: "",
          wposition: "",
          wcompany: "",
          wsalary: "",
          wgrade: "",
          status: "",
          wgov: "",
        })
      );
      return [...this.store.userexperience, ...defaultRows];
    },

    displayVoluntary() {
      const defaultRows = Array.from(
        { length: 27 - this.store.uservoluntary.length },
        (_, index) => ({
          name: "",
          InclusiveDateFrom: "",
          InclusiveDateTo: "",
          NumberofHours: "",
          Position: "",
        })
      );
      return [...this.store.uservoluntary, ...defaultRows];
    },

    displayedLearning() {
      const defaultRows = Array.from(
        { length: 25 - this.store.usertraining.length },
        (_, index) => ({
          name: "",
          InclusiveDateFrom: "",
          InclusiveDateTo: "",
          NumberofHours: "",
          Position: "",
        })
      );
      return [...this.store.usertraining, ...defaultRows];
    },
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    // async getUsers() {
    //   let res = await fetch("http://localhost:3000/users.json");
    //   res = await res.json();
    //   this.users = res;
    //   console.log("users=>", this.users);
    // },
    async print() {
      await new Promise((resolve) => setTimeout(resolve, 5000));
      const element = document.getElementById("print-area");
      // console.log('DEBUG element id?', id)
      const pdfGenerator = new jsPDF({
        orientation: "p",
        unit: "pt",
        format: [612, 936],
      });
      pdfGenerator.setProperties({ title: "PDS" });
      // console.log('DEBUG pdf generated title?', pdfName)
      pdfGenerator.html(element, {
        x: 0.2,
        y: 0,
        margin: [1, 1],
        html2canvas: { scale: 0.615 },
        // width: 216, windowWidth: 816, x: 0, y: 0,
        // html2canvas: { windowWidth: 816 },
        autoPaging: "text",
        callback: function (doc) {
          // console.log('DEBUG SUCCESS!')
          this.pdf = doc.output("bloburi");
          doc.save("PDS.pdf");
          // console.log('DEBUG hiding pdf...', pdfName)
        },
      });

      // if (window) window.print();
    },
  },
  setup() {
    const store = useLoginStore();
    const imageUrlPDS = ref("");

    if (store.pics) {
      imageUrlPDS.value = `${server}/Pics/${store.controlno}.jpg`;
    }
    return {
      store,
      imageUrlPDS,
    };
  },
};
</script>

<style>
.page-break {
  page-break-after: always;
}
table,
th,
td {
  border: 1px solid black;
  border-collapse: collapse;
}
.centerStyle {
  font-weight: 500;
  font-style: italic;
  text-align: center;
  background-color: rgb(210, 210, 210);
}
.red {
  color: red;
  text-align: center;
  font-style: italic;
  font-size: 12px;
  background-color: rgb(210, 210, 210);
}
.numerical {
  font-style: italic;
  background-color: rgb(150, 150, 150);
  color: #ffffff;
}
.footer {
  text-align: end;
  font-style: italic;
  font-weight: 100;
  font-size: 10px;
}
.number {
  background-color: rgb(210, 210, 210);
  /* text-align: center; */
  text-align: justify;
}
.numberCenter {
  background-color: rgb(210, 210, 210);
  text-align: center;
}
.photoCenter {
  text-align: center;
  font-size: 12px;
  margin-top: 20px;
}
.textCenter {
  text-align: center;
  margin-top: -1.5rem;
}
.margin {
  margin-top: 0px;
}
.box {
  width: 150px; /* Adjust the width as needed */
  height: 150px;
  border: 2px solid #000;
  text-align: center;
  padding: 10px; /* Adjust as needed */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  font-size: 8px;
  margin-top: 10%;
}
.boxed-table {
  border: 15px solid #ffffff; /* Adjust the color as needed */
  /* border-collapse: collapse; */
  width: 200%;
  margin-top: 5px;
}
.boxed {
  border: 15px solid #ffffff; /* Adjust the color as needed */
  border-collapse: collapse;
  width: 130%;
  margin-left: 198%;
  margin-top: -55%;
}
.boxed3 {
  border: 15px solid #ffffff; /* Adjust the color as needed */
  border-collapse: collapse;
  width: 100%;
  margin-left: 325%;
  margin-top: -65%;
}
.boxed4 {
  border: 15px solid #ffffff; /* Adjust the color as needed */
  border-collapse: collapse;
  width: 150%;

  margin-left: 150%;
}
.sign {
  padding: 60px;
  width: 30%;
}
.thumb {
  padding: 80px;
  width: 50%;
}
.dark {
  padding: 5px;
}
.align {
  margin: auto;
}
@media print {
  #print-area {
    margin: 0.11 0.17 0.11 0.19 !important;
    width: 150%;
  }

  #btn-group {
    display: none !important;
  }
  /* body {
    margin-top: -10px;
    margin-bottom: -50px;
  } */
  @page {
    size: 8.5in 13in;
    font-size: 20px;
  }
  .table {
    margin-top: -80px;
    margin-left: -35px;
    margin-right: -35px;
    margin-bottom: -40px;
  }

  .table2 {
    margin-left: 210%;
    margin-top: -71%;
  }
  .table3 {
    margin-left: 320%;
    margin-top: -85%;
    margin-bottom: 10px;
  }
  .table4 {
    margin-left: 180%;
  }
  .boxed-table {
    margin-top: 10px;
    width: 250% !important;
  }
  .boxed {
    width: 120%;
    margin-top: -80%;
    margin-left: 250%;
  }
  .boxed3 {
    width: 100%;
    margin-top: -95%;
    margin-left: 370%;
  }
  .title {
    font-size: 30px !important;
    padding-top: 2px;
  }
  .align {
    margin: 0;
  }
}
</style>
