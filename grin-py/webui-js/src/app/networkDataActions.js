// @flow
import { API_URL } from '../../config.js'
import { BLOCK_RANGE } from '../../constants/dataConstants.js'

export const fetchNetworkData = (start: number = 0) => async (dispatch, getState) => {
  try {
    const state = getState()
    const latestBlockHeight = state.networkData.latestBlock.height || 0
    const url = `${API_URL}grin/stats/${latestBlockHeight},${BLOCK_RANGE}/gps,height,difficulty`
    const networkDataResponse = await fetch(url)
    const networkData = await networkDataResponse.json()
    dispatch({ type: 'NETWORK_DATA', data: { historical: networkData, latestBlock: latestBlockData } })
  } catch (e) {
    console.log('Error: ', e)
  }
}

export const getLatestBlock = async () => (dispatch) => {
  try {
    const latestBlockUrl = `${API_URL}grin/block`
    const latestBlockResponse = await fetch(latestBlockUrl)
    const latestBlockData = await latestBlockResponse.json()
    dispatch({ type: 'LATEST_BLOCK', data: { latestBlock: latestBlockData } })
  } catch (e) {
    console.log('error: ', e)
  }
}
