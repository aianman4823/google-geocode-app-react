import React from 'react';
import axios from 'axios';




const GEOCODE_ENDPOINT ='https://maps.googleapis.com/maps/api/geocode/json?key=AIzaSyBetmhuBYLD5NZCZVZGLiud5XGBihukOsA'


export default class App extends React.Component{
    constructor(props){
        super(props)
        this.state={
            place:'東京タワー',
        };
        this.handleGetLatAndLng=this.handleGetLatAndLng.bind(this)
        this.handleDelete=this.handleDelete.bind(this)
    }


    handleGetLatAndLng(){
        axios.get(GEOCODE_ENDPOINT,{
            params:{
                address: this.state.place,
            }
        })
        .then((res)=>{
            const data=res.data;
            const result=data.results[0];
            const location=result.geometry.location;
            this.setState({
                address:result.formatted_address,
                lat: location.lat,
                lng: location.lng,
            });

        },
        ).catch((err)=>{
            console.log("通信に失敗しました",err);
        });
    } 

    handleDelete(){
        this.setState({
            address:'',
            lat:'',
            lng:'',
            place:'',
        });
    }

    

    render(){
        return(
            <div className="app">
                <h1 className="app-title">経度緯度検索</h1>
                <input type="text" name="場所" value={this.state.place} onChange={(e)=>this.setState({place: e.target.value})}/>
                <br/>
                <button type="submit" onClick={this.handleGetLatAndLng}>検索</button>
                <p>場所名: {this.state.place}</p>
                <p>経度: {this.state.lat}</p>
                <p>緯度: {this.state.lng}</p>
                <button type="submit" onClick={this.handleDelete}>削除</button>
                <hr/>
                
            </div>
        )
    }
}