import React from "react";
import {connect} from "react-redux";
import Button from "@material-ui/core/IconButton";
import WbIncandescentIcon from "@material-ui/icons/WbIncandescent";
import {selectLightMessage, sendMqttMessage} from "../redux/actions/rabbitmqActions";

/**
 * Extracts the lights from the redux store to be able to use in the props under lightsInStore field.
 *
 * @param state from redux store
 * @returns {{lightsInStore: [*]}}
 */
const mapStateToProps = state => ({
    lightInStore: selectLightMessage(state)
});

/**
 * To be able to trigger dispatch for redux  store.
 *
 * @param dispatch
 * @returns {{handleLightClick: handleLightClick}}
 */
const mapDispatchToProps = dispatch => {
    return {
        handleLightClick: (e) => {
            console.log('>> Clicked:' + e.target);
            // TODO: generate action for sending something
            dispatch(sendMqttMessage("test11111"));
        }
    }
};

const UI = ({lightInStore, handleLightClick}) => (
    <Button variant="contained" color="primary" onClick={handleLightClick}>
        <WbIncandescentIcon/>
        {lightInStore}
    </Button>
);

const LightButton = connect(mapStateToProps, mapDispatchToProps)(UI);

export default LightButton;