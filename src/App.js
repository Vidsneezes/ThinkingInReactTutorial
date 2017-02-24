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
    this.props.products.forEach(function(product){
      if(product.category !== lastCategory){
        rows.push(<ProductCategoryRow category={product.category} key={product.category}/>);
    
      }
      rows.push(<ProductRow product={product} key={product.name}/>);
      lastCategory = product.category;
    });
    return (
      <table>
        <thead>
          <th>Name</th>
          <th>Price</th>
        </thead>
        <tbody>{rows}</tbody>
      </table>
    );
  }
}

class FilterableProductTable extends Component {
  render() {
    return (
      <div>
        <ProductTable products={this.props.products}/>
      </div>
    );
  }
}

export default FilterableProductTable;
