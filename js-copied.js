$(document).ready(function () {

  var table = $('#example').DataTable({

    'dom':
      "<'row'<'col-sm-12 col-md-6'l><'col-sm-12 col-md-6'f>>" +
      "<'row'<'col-sm-12'tr>>" +
      "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>",

    'ajax': 'https://jreger.github.io/test1.json',

    'buttons': [ 'csv',
      {
        'text': '<i class="fa fa-id-badge fa-fw" aria-hidden="true"></i>',
        'action': function (e, dt, node)
          {
            $(dt.table().node()).toggleClass('cards');
            $('.fa', node).toggleClass(['fa-table', 'fa-id-badge']);
            dt.draw('page');
          },
        'className': 'btn-sm',
        'attr': { 'title': 'Ansicht aendern'}
      }
    ],

    'select': 'single',

    'columns': [
      { 'data': 'id' },
      { 'data': 'name' },
      { 'data': 'screenshot' },
      { 'data': 'status', 'class': 'text-right' },
      { 'data': 'sparte', 'class': 'text-right' },
      { 'data': 'datum' }
    ],

    'drawCallback': function (settings) {
      var api = this.api();
      var $table = $(api.table().node());

      if ($table.hasClass('cards')) {

        // Create an array of labels containing all table headers
        var labels = [];
        $('thead th', $table).each(function () {
          labels.push($(this).text());
        });

        // Add data-label attribute to each cell
        $('tbody tr', $table).each(function () {
          $(this).find('td').each(function (column) {
            $(this).attr('data-label', labels[column]);
          });
        });

        var max = 0;
        $('tbody tr', $table).each(function () {
          max = Math.max($(this).height(), max);
        }).height(max);

      } else {

        // Remove data-label attribute from each cell
        $('tbody td', $table).each(function () {
          $(this).removeAttr('data-label');
        });

        $('tbody tr', $table).each(function () {
          $(this).height('auto');
        });
      }
    }
  })

  .on('select', function (e, dt, type, indexes) {
    var rowData = table.rows(indexes).data().toArray()
    $('#row-data').html(JSON.stringify(rowData));
  })

  .on('deselect', function () {
    $('#row-data').empty();
  })

});
