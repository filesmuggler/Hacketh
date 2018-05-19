var substringMatcher = function(strs) {
    return function findMatches(q, cb) {
      var matches, substringRegex;
  
      // an array that will be populated with substring matches
  
      
      // regex used to determine if a string contains the substring `q`
      substrRegex = new RegExp(q, 'i');
  
      // iterate through the pool of strings and for any string that
      // contains the substring `q`, add it to the `matches` array
      $.each(strs, function(i, str) {
        if (substrRegex.test(str)) {
          matches.push(str);
        }
      });
  
      cb(matches);
    };
  };
  
  function parseTags(id) {
      var setTags = $('#' + id).text();
      setTags = setTags.replace(/\s\s+/g, '');
      
      if(!setTags.length) {
          return [];
      }
  
      setTags = setTags.replace(/(^\s*)|(,\s*$)/g, '');
      setTags = setTags.split(',');
      return setTags;
  }
  
  $(document).ready(function(){
      if(document.getElementById('tags')) {
          new Taggle('tags', {
              hiddenInputName: 'tags[]',
              placeholder: '',
              tags: parseTags('tag-data'),
              duplicateTagClass: 'bounce',
              onTagAdd: function() {
                  $(this).val('');
                  $('.tt-suggestion').remove();
              }
          });
          
          $('#tags .taggle_input').typeahead({
            hint: true,
            highlight: true,
            minLength: 1
          },
          {
            name: 'tags',
            source: substringMatcher(parseTags('available-tag-data'))
          });
      }
      
      $('.taggle_input').on('blur', function() {
          $(this).val('');
          $('.tt-suggestion').remove();
      });
    
    $('.tt-input').first().focus();
  });