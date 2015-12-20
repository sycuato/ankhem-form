var Input 	= require('ankhem-input');
var Button 	= require('ankhem-button');

var Form = React.createClass({

	getInitialState: function(){
		var state = this.constructStateByFields();
		return state;
	},

	// Render

	render: function(){

		var props = {
			className: this.props.className,
			onKeyDown: this.eventKeyDown,
		}

		return (
			<form {...props}>

				<div className="form-inputs">
					{ this.renderInputList() }
				</div>

				{ this.renderSubmitButton() }
			</form>
		);
	},

	renderInputList: function(){
		return this.props.fields.map( this.renderInputItem );
	},

	renderInputItem: function(field, index){
		return <Input field={field} key={index} onChange={this.eventInputChange} />
	},

	renderSubmitButton: function(){
		return (
			<Button type="submit" data={this.props.button} requestData={this.constructRequestData} />
		);
	},

	// Event

	eventKeyDown: function(event){
		if(event.keyCode == 13){
			$(event.target).parents('form').find('button.submit').click();
		}
	},

	eventInputChange: function(state){
		this.setState(state);

		if(Config.mode.dev){
			setTimeout(function(){
				console.log(this.state);
			}.bind(this) ,20)
		}
	},

	// Construct Data by Props

	constructStateByFields: function(){

		var state = {};

		$.each(this.props.fields, function(i, field){
			state[field.name] = field.value ? field.value : '';
		});

		return state;
	},

	constructRequestData: function(extras){

		var requestData = {};

		// fields
		$.each(this.props.fields,
			function(i, field){
				requestData[field.name] = this.state[field.name];
			}.bind(this)
		);
		
		// fields extras
		if(extras){
			$.each(extras,
				function(key, val){
					requestData[key] = val;
				}
			);
		}

		// token in request
		if(Config.mode.jwt == 'GET'){
			requestData['token'] = window.localStorage.token;
		}

		return requestData;
	},
});

module.exports = Form;