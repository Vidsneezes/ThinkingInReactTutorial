import React, { Component } from 'react';

class ProductCategoryRow extends Component{
  render(){
    return <tr><th colSpan="2">{this.props.category}</th></tr>;
  }
}

class ProductRow extends Component{
  render(){
    var name = this.props.product.stocked ? this.props.product.name : <span style={{color:'red'}}>{this.props.product.name}</span>;
    return (
      <tr>
       <td>{name}</td>
       <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

class ProductTable extends Component{
  render(){
    var rows = [];
    var lastCategory = null;
    this.props.products.forEach((product) =>{
      if(product.name.indexOf(this.props.filterText) === -1 || (!product.stocked && this.props.inStockOnly)){
        return;
      }
      if(product.category !== lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
      }
      rows.push(<ProductRow product={product} key={product.name}/>);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class SearchBar extends Component{
  constructor(props){
    super(props);
    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(e){
    this.props.onFilterTextInput(e.target.value);
  }

  handleInStockInputChange(e){
    this.props.onInStockInput(e.target.checked);
  }

  render(){
    return (
      <form>
        <input 
          type="text" 
          placeholder="Search..." 
          value={this.props.filterText}
          onChange={this.handleFilterTextInputChange}
          />
        <p>
          <input 
            type="checkbox" 
            checked={this.props.inStockOnly}
            onChange={this.handleInStockInputChange}
            />
          {' '}
          Only show products in stock
        </p>
      </form>
    );
  }
}

class FilterableProductTable extends Component {
  constructor(props){
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    };

    this.handleFilterTextInputChange = this.handleFilterTextInputChange.bind(this);
    this.handleInStockInputChange = this.handleInStockInputChange.bind(this);
  }

  handleFilterTextInputChange(filterText){
    this.setState({
      filterText: filterText
    });
  }

  handleInStockInputChange(inStockOnly){
    this.setState({
      inStockOnly: inStockOnly
    });
  }

  render() {
    return (
      <div>
        <SearchBar 
          filterText = {this.state.filterText}
          inStockOnly = {this.state.inStockOnly}
          onFilterTextInput={this.handleFilterTextInputChange}
          onInStockInput={this.handleInStockInputChange}
        />
        <ProductTable 
          products={this.props.products}
          filterText = {this.state.filterText}
          inStockOnly = {this.state.inStockOnly}
        />
      </div>
    );
  }
}

export default FilterableProductTable;
