const togglePublicBtns = '.time-entry-public-hover';

let publicDate;
let publicCompany;
let publicUser;
let publicHours;
let publicDescription;

instantiatePublicToggleBtn(togglePublicBtns);

export function instantiatePublicToggleBtn(togglePublicBtnSelector) {
  let togglePublicBtn = $(togglePublicBtnSelector);

  // On hover
  togglePublicBtn.hover(
    function() {
      const row = $(`#${$(this).data('tabletype')}TimeEntryTableRow${$(this).data('rownumber')}`);
      row.css("background-color", '#ffa');

      // Date
      publicDate = $(row).find('td:eq(0)').html();
      $(row).find('td:eq(0)').html($(this).data('date').split('T')[0]);

      // Company
      publicCompany = $(row).find('td:eq(1)').html();
      $(row).find('td:eq(1)').html($(this).data('company'));

      // User
      publicUser = $(row).find('td:eq(2)').html();
      $(row).find('td:eq(2)').html($(this).data('user'));

      // Hours
      publicHours = $(row).find('td:eq(3)').html();
      $(row).find('td:eq(3)').html($(this).data('hours'));

      // Description
      publicDescription = $(row).find('td:eq(4)').html();
      $(row).find('td:eq(4)').html($(this).data('description'));

    },
    // Off hover
    function() {
      const row = $(`#${$(this).data('tabletype')}TimeEntryTableRow${$(this).data('rownumber')}`);
      row.css("background-color", '#fff');

      // Date
      $(row).find('td:eq(0)').html(publicDate.split('T')[0]);

      // Company
      $(row).find('td:eq(1)').html(publicCompany);

      // User
      $(row).find('td:eq(2)').html(publicUser);

      // Hours
      $(row).find('td:eq(3)').html(publicHours);

      // Description
      $(row).find('td:eq(4)').html(publicDescription);
    }
  );
}