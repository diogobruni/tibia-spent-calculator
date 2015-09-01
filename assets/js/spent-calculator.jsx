var Result = React.createClass({
	render: function() {
		return <p className="result">
			<img src="assets/images/gold.gif" />
			<br />
			<strong className="h3">{this.props.total}</strong>
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
						<img src={'assets/images/' + items[field].imgSrc} title={items[field].name}/>
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
			allFields: [
				'mp', 'smp', 'gmp',
				'hp', 'shp', 'ghp', 'uhp',
				'gsp',
				'ava', 'gfb', 'ths', 'sd', 'uh',
				'fbomb', 'fwall', 'ebomb', 'ewall',
				'astar', 'carrow', 'pbolt'
			],
			fields: {
				mp: [ 'mp', 'smp', 'gmp' ],
				hp: [ 'hp', 'shp', 'ghp', 'uhp' ],
				mhp: [ 'gsp' ],
				runes: [ 'ava', 'gfb', 'ths', 'sd' ],
				fieldRunes: [ 'fbomb', 'fwall', 'ebomb', 'ewall' ],
				ammo: [ 'astar', 'carrow', 'pbolt' ]
			},
			items: {
				// Mana Potions
				mp: {
					name: 'Mana Potion',
					price: 50,
					used: 0,
					imgSrc: 'mp.gif'
				},
				smp: {
					name: 'Strong Mana Potion',
					price: 80,
					used: 0,
					imgSrc: 'smp.gif'
				},
				gmp: {
					name: 'Great Mana Potion',
					price: 120,
					used: 0,
					imgSrc: 'gmp.gif'
				},

				// Health Potions
				hp: {
					name: 'Health Potion',
					price: 45,
					used: 0,
					imgSrc: 'hp.gif'
				},
				shp: {
					name: 'Strong Health Potion',
					price: 100,
					used: 0,
					imgSrc: 'shp.gif'
				},
				ghp: {
					name: 'Great Health Potion',
					price: 190,
					used: 0,
					imgSrc: 'ghp.gif'
				},
				uhp: {
					name: 'Ultimate Health Potion',
					price: 310,
					used: 0,
					imgSrc: 'uhp.gif'
				},

				// Great Spirit Potion
				gsp: {
					name: 'Great Spirit Potion',
					price: 190,
					used: 0,
					imgSrc: 'gsp.gif'
				},

				// Runes
				ava: {
					name: 'Avalanche',
					price: 45,
					used: 0,
					imgSrc: 'ava.gif'
				},
				gfb: {
					name: 'Great Fireball',
					price: 45,
					used: 0,
					imgSrc: 'gfb.gif'
				},
				ths: {
					name: 'Thunderstorm',
					price: 37,
					used: 0,
					imgSrc: 'ths.gif'
				},
				sd: {
					name: 'Sudden Death',
					price: 108,
					used: 0,
					imgSrc: 'sd.gif'
				},
				uh: {
					name: 'Ultimate Healing',
					price: 175,
					used: 0,
					imgSrc: 'uh.gif'
				},
				fbomb: {
					name: 'Fire Bomb',
					price: 117,
					used: 0,
					imgSrc: 'fbomb.gif'
				},
				fwall: {
					name: 'Fire Wall',
					price: 61,
					used: 0,
					imgSrc: 'fwall.gif'
				},
				ebomb: {
					name: 'Energy Bomb',
					price: 162,
					used: 0,
					imgSrc: 'ebomb.gif'
				},
				ewall: {
					name: 'Energy Wall',
					price: 85,
					used: 0,
					imgSrc: 'ewall.gif'
				},

				astar: {
					name: 'Assassin Star',
					price: 100,
					used: 0,
					imgSrc: 'astar.gif'
				},
				carrow: {
					name: 'Crystalline Arrow',
					price: 20,
					used: 0,
					imgSrc: 'carrow.gif'
				},
				pbolt: {
					name: 'Prismatic Bolt',
					price: 20,
					used: 0,
					imgSrc: 'pbolt.gif'
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

		for( i in this.state.allFields ) {
			var field = this.state.allFields[i];
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
				<div className="section">

					<h3 className="header center">Supplies Spent</h3>
					<form onSubmit={this.handleSubmit} className="">

						<ul className="collapsible s12" data-collapsible="expandable">
							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Health Potions
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.mp} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>

							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Mana Points
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.hp} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>

							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Paladin Potions
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.mhp} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>

							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Offensive Runes
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.runes} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>

							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Field Runes
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.fieldRunes} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>

							<li>
								<div className="collapsible-header waves-effect waves-teal">
									Ammunition
								</div>
								<div className="collapsible-body">
									<div className="row">
										<div className="col s12">
											<ItemsField fields={this.state.fields.ammo} items={this.state.items} onChange={this.onUsedChange} />
										</div>
									</div>
								</div>
							</li>
						</ul>

					</form>
				</div>

				<div class="divider"></div>

				<div className="section">
					<h3 className="header center">Value Spent</h3>
					<div className="center">
						<Result total={this.state.beatyValue} />
					</div>
				</div>
			</div>
		);
	}
});

React.render(<Calculator />, document.getElementById('tibia-spent-calculator') );

jQuery(document).ready(function(){
	jQuery('.collapsible').collapsible({
		accordion : false // A setting that changes the collapsible behavior to expandable instead of the default accordion style
	});
});