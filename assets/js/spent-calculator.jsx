var Result = React.createClass({
	render: function() {
		return <p className="result">
			<img src="assets/images/gold.gif" />
			<br />
			<strong>{this.props.total}</strong>
		</p>;
	}
});

var ItemsField = React.createClass({
	render: function() {
		var fields = this.props.fields;
		var items = this.props.items;
		var onChange = this.props.onChange;

		var createItem = function(field, index) {
			return (
				<div className="input-field col s2">
					<i className="material-icons prefix">
						<img src={'assets/images/' + items[field].imgSrc} />
					</i>
					<input id="icon_prefix" type="text" className="validate" name={field} onChange={onChange} defaultValue={items[field].used} />
				</div>
			);
		}

		return <div>{fields.map(createItem)}</div>;
	}
});
var Calculator = React.createClass({
	getInitialState: function() {
		return {
			fields: [ 'mp', 'smp', 'gmp', 'hp', 'shp', 'ghp', 'uhp', 'gsp', 'ava', 'gfb', 'ths', 'sd' ],
			items: {
				// Mana Potions
				mp: {
					price: 50,
					used: 0,
					imgSrc: 'mp.gif'
				},
				smp: {
					price: 80,
					used: 0,
					imgSrc: 'smp.gif'
				},
				gmp: {
					price: 120,
					used: 0,
					imgSrc: 'gmp.gif'
				},

				// Health Potions
				hp: {
					price: 45,
					used: 0,
					imgSrc: 'hp.gif'
				},
				shp: {
					price: 100,
					used: 0,
					imgSrc: 'shp.gif'
				},
				ghp: {
					price: 190,
					used: 0,
					imgSrc: 'ghp.gif'
				},
				uhp: {
					price: 310,
					used: 0,
					imgSrc: 'uhp.gif'
				},

				// Great Spirit Potion
				gsp: {
					price: 190,
					used: 0,
					imgSrc: 'gsp.gif'
				},

				// Runes
				ava: {
					price: 45,
					used: 0,
					imgSrc: 'ava.gif'
				},
				gfb: {
					price: 45,
					used: 0,
					imgSrc: 'gfb.gif'
				},
				ths: {
					price: 37,
					used: 0,
					imgSrc: 'ths.gif'
				},
				sd: {
					price: 108,
					used: 0,
					imgSrc: 'sd.gif'
				},
				uh: {
					price: 175,
					used: 0,
					imgSrc: 'uh.gif'
				}
			},

			total: 0,
			beatyValue: '0'
		};
	},
	onUsedChange: function(e) {
		e.preventDefault();

		var item = e.target.name;
		var used = e.target.value;
		this.state.items[ item ].used = used;

		this.Recalc();
	},
	onChange: function(e) {
		this.setState({text: e.target.value});
	},
	Recalc: function(e) {
		console.log( 'recalc' );

		var total = 0;

		for( i in this.state.fields ) {
			var field = this.state.fields[i];
			var price = this.state.items[ field ].price;
			var used = this.state.items[ field ].used;
			total += price * used;
		}

		this.state.total = total;

		this.setState({ beatyValue: total });
	},
	handleSubmit: function(e) {
		e.preventDefault();
		var nextItems = this.state.items.concat([this.state.text]);
		var nextText = '';
		this.setState({items: nextItems, text: nextText});
	},
	render: function() {
		return (
			<div>
				<div className="row">
					<form onSubmit={this.handleSubmit} className="col s12">
						<h3 className="center">Itens Utilizados</h3>
						<ItemsField fields={this.state.fields} items={this.state.items} onChange={this.onUsedChange} />
					</form>
				</div>
				<div className="row">
					<h3 className="center">Valor Gasto</h3>
					<div className="center">
						<Result total={this.state.beatyValue} />
					</div>
				</div>
			</div>
		);
	}
});

React.render(<Calculator />, document.getElementById('tibia-spent-calculator') );