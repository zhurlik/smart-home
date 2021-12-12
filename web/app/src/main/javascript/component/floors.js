import React from 'react';
import {connect} from 'react-redux';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ListSubheader from '@material-ui/core/ListSubheader';
import {GridListTileBar} from '@material-ui/core';
import LightButton from './lightButton';
import {useTranslation} from 'react-i18next';

const mapStateToProps = state => ({
    floors: [...state.floors]
});

const UI = ({floors}) => {
    const {t, i18n} = useTranslation('labels');

    return floors.map(floor => (
        <GridList key={'floor' + floor.id} cols={5} cellHeight={180}>
            <GridListTile key={'floorTitle' + floor.id} cols={5} style={{height: 'auto'}}>
                <ListSubheader color={'primary'} component={'div'}>{floor.name}</ListSubheader>
            </GridListTile>

            {floor.flats.map(flat => (
                <GridListTile key={'floor' + floor.id + 'flat' + flat.id}>
                    <GridListTileBar title={flat.name}
                                     subtitle={t('test1')}
                    />
                    <LightButton/>
                    <div>temperature</div>
                    <div>sensors</div>
                </GridListTile>
            ))}
        </GridList>
    ))
};

const Floors = connect(mapStateToProps, null)(UI);
export default Floors;