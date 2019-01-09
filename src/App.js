import React, { Component } from 'react';

class App extends Component {
  constructor(){
    super();
    this.state={
      contacto:{
        nombre:'',
        telefono:'',
        _id:''
      },
      contactos:[]
    };
    this.Cambios=this.Cambios.bind(this);
    this.addCon=this.addCon.bind(this);
  }
  async componentDidMount(){
    this.lsCon();
  }

  Cambios(n,e){
    let con=this.state.contacto;
    con[n]=e.target.value;
    this.setState({contacto:con});
  }
  async addCon(e){
    e.preventDefault();
    if(this.state.contacto._id){
      const rs=await fetch(`/api/contacto/up/${this.state.contacto._id}`,{method:'PUT',
        body:JSON.stringify({
          nombre:this.state.contacto.nombre,
          telefono:this.state.contacto.telefono
        }),
        headers:{'Accept':'application/json','Content-Type':'application/json'}
      });
      const ms=await rs.json();
      this.setState({contacto:{nombre:'',telefono:'',_id:''}});
      this.lsCon();
      window.M.toast({html:ms.msg},2000);

    }else{
      const rs=await fetch(`/api/contacto/save`,{method:'POST',
        body:JSON.stringify(this.state.contacto),
        headers:{'Accept':'application/json','Content-Type':'application/json'}
      });
      const ms=await rs.json();
      this.setState({contacto:{nombre:'',telefono:'',_id:''}});
      this.lsCon();
      window.M.toast({html:ms.msg},2000);
    }
  }
  async delCon(id){
    const rs=await fetch(`/api/contacto/del/${id}`,{method:'DELETE'});
    const ls=await rs.json();
    this.lsCon();
    window.M.toast({html:ls.msg},2000);
  }
  async upCon(id){
    const rs=await fetch(`/api/contacto/busca/${id}`);
    const ls=await rs.json();
    this.setState({contacto:{
      nombre:ls.nombre,
      telefono:ls.telefono,
      _id:ls._id
    }});    
  }
  async lsCon(){
    const rs=await fetch(`/api/contacto/lista`);
    const ls=await rs.json();
    this.setState({contactos:ls.c});
  }

  render() {
    return (
      <div className="">
        <div className="row">
          <form onSubmit={this.addCon} className="col s12">
            <div className="row">
              <div className="input-field col s6">
                <i className="material-icons prefix">account_circle</i>
                <input onChange={this.Cambios.bind(this,"nombre")} value={this.state.contacto.nombre} id="icon_prefix" type="text" className="validate"/>
                <label for="icon_prefix">First Name</label>
              </div>
              <div className="input-field col s6">
                <i className="material-icons prefix">phone</i>
                <input onChange={this.Cambios.bind(this,"telefono")} value={this.state.contacto.telefono} id="icon_telephone" type="text" className="validate"/>
                <label for="icon_telephone">Telephone</label>
              </div>
              <div className="input-field col s6">
                <button className="btn waves-effect waves-light" type="submit" name="action">Guardar
                  <i className="material-icons right">send</i>
                </button>
              </div>
            </div>
          </form>
        </div>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Telefono</th>
              <th>Editar</th>
              <th>Eliminar</th>
            </tr>
          </thead>
          <tbody>
            {this.state.contactos.map(con=>{return(
              <tr key={con._id}>
                <th>{con.nombre}</th>
                <th>{con.telefono}</th>
                <th>                
                  <button onClick={()=>this.upCon(con._id)} className="btn waves-effect waves-light" type="submit" name="action">
                    <i className="material-icons right">edit</i>
                  </button>
                </th>
                <th>
                  <button onClick={()=>this.delCon(con._id)} className="btn waves-effect waves-light" type="submit" name="action">
                    <i className="material-icons right">delete</i>
                  </button>
                </th>
              </tr>
            )})}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
