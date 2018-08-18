import 'bootstrap';
import '../sass/style.scss';

import './modules/helpers/flasher'

import './modules/user/userAll'
import './modules/user/ajax/editUserAll'
import './modules/user/ajax/editUserOne'
import './modules/user/editUserValidation'

import './modules/company/companyAll'
import './modules/company/companyOne'
import './modules/company/ajax/createCompany'
import './modules/company/ajax/editCompany'
import './modules/company/createCompanyValidation'
import './modules/company/editCompanyValidation'
import './modules/company/ajax/companyToggleActiveInactive'

import './modules/hourLog/hourLogAll'
import './modules/hourLog/hourLogOne'
import './modules/hourLog/ajax/hourLogToggleOpenClose'

import './modules/timeEntry/timeEntryNew'
import './modules/timeEntry/timeEntryDatepicker'
import './modules/timeEntry/ajax/createTimeEntry'
import './modules/timeEntry/ajax/editTimeEntry'
import './modules/timeEntry/createTimeEntryValidation'
import './modules/timeEntry/editTimeEntryValidation'
import './modules/timeEntry/ajax/timeEntryTableActions'