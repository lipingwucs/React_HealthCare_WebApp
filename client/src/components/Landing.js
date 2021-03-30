import React, {Component} from 'react';
import { Link } from 'react-router-dom';


class DisplayCourses extends Component {
    constructor(props) {
        super(props);
        this.state = {
           
        };
    }

    componentDidMount() {
        //console.log("DisplayCourses");
        
    }
    

    render() {
        return (
            <div className="container">
                <div >
                    <div className="col-sm-8 mx-auto">
                        <h1 className="text-center">Clinic System - Homepage</h1>
                    </div>
                    
                    <h2>we do support three different roles: admin, nurse and patient. you can only register a new nurse or patient user account. </h2>
                    <div>
                        <ul>
                            <li align="left" class="text-info"> <span>View my profile</span></li>
                            <li align="left" class="text-info"> Register</li>
                            <li align="left" class="text-info"> login/logout</li>

                            <li align="left" class="text-info"> Nurse add/drop patient </li>
                            <li align="left" class="text-info"> Nurse Send/preview/delete Daily motivational tips to a specific patient </li>
                            <li align="left" class="text-info"> Nurse entry/preview/delete the vital signs for a specific patient </li>
                            <li align="left" class="text-info"> Nurse view all history data of patient's vital signs </li>
                            <li align="left" class="text-info"> Nurse view/reply the daily information of patient </li>
                            <li align="left" class="text-info"> Nurse view/reply patient's emergency alerts </li>
                            
                            <li align="left" class="text-info"> patient view his/her Daily motivational tips and play the youtube video sending from nurse </li>
                            <li align="left" class="text-info"> patient send emergency alerts to nurse </li>
                            <li align="left" class="text-info"> patient view all my emergency alerts and response from nurse </li>
                            <li align="left" class="text-info"> patient add daily information of vital signs </li>
                            <li align="left" class="text-info"> patient view health history and nurse reply </li>
                            <li align="left" class="text-info"> AI to predict health risk </li>
                            <li align="left" class="text-info"> Patient can read Diagrams of all his health data  </li>

                            
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default DisplayCourses