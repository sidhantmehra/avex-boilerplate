const selectors = {
	form: '#productForm',
	variantSelectId: 'variant-select',  
	productOptionSelect: '.product-option-select'
}

const productJSON = JSON.parse(document.getElementById('product-json').innerHTML);
new Shopify.OptionSelectors(selectors.variantSelectId, { product: productJSON, onVariantSelected: selectCallback, enableHistoryState: true });


/**
 * Function that runs on each variant change
 * 
 * @param {*} variant 
 */
function selectCallback(variant){
  console.log(variant)
}


/**
 * Function that serializes a form and returns an object with key: value pairs for each form field
 *
 * @param {*} form - HTMLFormElement
 * @returns
 */
function serializeForm(form) {
	var obj = {};
	var formData = new FormData(form);
	for (var key of formData.keys()) {
		obj[key] = formData.get(key);
	}
	return obj;
}


const productForm = document.querySelector(selectors.form)
productForm.addEventListener('submit', function(e){
	e.preventDefault()
	const formData = serializeForm(this)
	CartJS.addItem(formData.id, formData.quantity, {}, {
		success: (data, textStatus)=>{
			console.log('Added to cart: ', data, textStatus)
		}, 
		error: (jqXHR, textStatus, errorThrown)=> {
			console.log('Error in adding to cart: ', errorThrown)
		}
	})
})


/**
 Listen to change events in the form option selectors, when changed, trigger change event in the select generated by Shopify.OptionSelectors  
 */
Array.from(document.querySelectorAll(selectors.productOptionSelect)).map((el)=>{
	el.addEventListener('change', function(e) {
		const formData = serializeForm(productForm)
		const optionSelection = Object.keys(formData).map(v => /^option/.test(v) && formData[v]).filter(el=>el)
		const optionIndex = e.target.getAttribute('name')
		
		const curVariant = productJSON.variants.find(variant=>JSON.stringify(variant.options)===JSON.stringify(optionSelection))
		
		const variantSelect = document.querySelector(`.single-option-selector[data-option=${optionIndex}]`)
		variantSelect.value = curVariant[optionIndex]
		variantSelect.dispatchEvent(new Event("change"))
	})
})