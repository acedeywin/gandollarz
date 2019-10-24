  const currencies = [{
        id: 'USD', name: 'US Dollars'
      }, {
        id: 'UGX', name: 'Ugandan Shillings'
      }, {
        id: 'KES', name: 'Kenyan Shillings'
      }, {
        id: 'GHS', name: 'Ghanian Cedi'
      }, {
        id: 'ZAR', name: 'South African Rand'
      }];
      
      const apiBase = 'https://free.currencyconverterapi.com/api/v6/';
      const api = (currency) => `
        ${apiBase}convert?q=${currency}_NGN&compact=ultra&apiKey=d9999a2d8efcfdc47c0c
    `;
      
      const toast = (msg) => {
        const toastr = document.querySelector('.messages');
        if(!toastr) return;
        
        toastr.textContent = msg;
        if(!toastr.classList.contains('on')) {
          toastr.classList.add('on');
        }
      };
      
      const doneToasting = () => {
        const toastr = document.querySelector('.messages');
        if(!toastr) return;
        
        toastr.textContent = '';
        toastr.classList.remove('on');
      };
      
      const conversionSucceeded = (apiResponse) => {
        if(!apiResponse) {
          toast(`nothing to display ...`);
          return;
        }
        
        const [value] = Object.values(apiResponse)
        
        const btn = document.querySelector('button');
        btn.removeAttribute('disabled');
        
        const display = document.querySelector('.conversion');
        const formatter = new Intl.NumberFormat(
          'en-NG', { style: 'currency', currency: 'NGN' }
        );
        
        display.textContent = formatter.format(value);
        doneToasting();
      };
      
      // declare populateCurrencies here   
      const populateCurrencies = () => {
        
        const select = document.querySelector('.select-text');
        
        currencies.forEach((currency) => {
            
          const option = document.createElement('option');
          option.value = currency.id;
          option.innerHTML = currency.name;
          select.add(option);
      });
        
      };
      
      const getSelectedCurrency = () => {
        // here, determine and return the selected value 
        // of the SELECT element

      const select = document.querySelector('.select-text');
        const getValue = select.options[select.selectedIndex].value;
        return getValue;
      };
      
            
      const convert = (event) => {
        toast(`preparing to convert ...`);
        
        const btn = event ? 
              event.target : document.querySelector('button');
        
        const selected = getSelectedCurrency();
        
        if(!selected || selected.trim() === '' 
           || !currencies.map(c => c.id).includes(selected)) return;
        
        btn.setAttribute('disabled', 'disabled');
        toast(`converting ...`);
        
        const endpoint = api(selected);
        
        // make a GET fetch call to the endpoint
        // variable declared above, convert the response to JSON,
        // then call conversionSucceeded and pass the JSON data to it 
        fetch(endpoint, {
          method: 'GET',
        })
        .then(response => response.json())
        .then(responseJson => {
          conversionSucceeded(responseJson);
        })


      };
      
      const startApp = () => {
        // call populateCurrencies here
        populateCurrencies(); 
        
        // add a click listener to the button here
        const btn = document.querySelector('button');
        
        btn.addEventListener('click', event => {
          convert(event);
        }); 
      };

      startApp();  
    
     