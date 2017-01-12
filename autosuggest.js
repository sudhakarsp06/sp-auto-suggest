(function() {

	var removeList = function()
	{
		if( this.parentNode.lastChild.nodeName.toLowerCase() === 'ul' )
			this.parentNode.removeChild(this.parentNode.lastChild);

	};

	var fillInput = function(e)
	{
		this.value = e.currentTarget.innerHTML; 
		removeList.bind(this)();
	}

	var buildList = function(matches, input_elem)
	{
		var ul = input_elem.parentNode.lastChild;
		if( ul.nodeName.toLowerCase() != 'ul' )
		{
			ul = document.createElement('ul');
			input_elem.parentNode.appendChild(ul);
		}
		ul.innerHTML = '';
		var li, textnode;
		var ln = matches.length;
		for(var i = 0; i < ln; i++)
		{
			textnode = document.createTextNode(matches[i]);
			li = document.createElement('li');
			li.appendChild(textnode);
			li.addEventListener('click',fillInput.bind(input_elem) );
			ul.appendChild(li);
		}
	};

	var autoSuggest = function(e)
	{
		var matches = [];
		if(this.value  !== '')
		{
			for(var key in cities)
			{
				if( cities.hasOwnProperty(key) && cities[key].indexOf(this.value) === 0)
				matches.push( cities[key] );
			}
			buildList(matches, this);
		} else if( this.value === '' )
		{
			removeList.bind(this)();
		}

	};


	//Loop through all the inputs
	var onDomload = function() {

		if( typeof document.getElementsByClassName('sp_autosuggest') ==  'object' ) {
			var input_boxes = document.getElementsByClassName('sp_autosuggest');
			var wrapper_elem;
			for(var i = 0; i < input_boxes.length; i++)
			{
				//Build a wrapper around the text box
				wrapper_elem = input_boxes[i].parentNode;
				if(  wrapper_elem.className != 'sp_list_wrapper' )
				{
					wrapper_elem = document.createElement('div');			
					wrapper_elem.setAttribute('class','sp_list_wrapper');
					input_boxes[i].parentNode.insertBefore(wrapper_elem, input_boxes[i].nextSibling);
					wrapper_elem.innerHTML = input_boxes[i].outerHTML;			
					wrapper_elem.firstChild.addEventListener('keyup',autoSuggest);
				}
				
				//remove the original text box
				input_boxes[i].parentNode.removeChild(input_boxes[i]);
			}	
		}	
	};	
	document.addEventListener('DOMContentLoaded',onDomload);


})();