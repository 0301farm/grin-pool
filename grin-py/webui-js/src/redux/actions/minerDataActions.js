// @flow
import { API_URL } from '../../config.js'
import { BLOCK_RANGE } from '../../constants/dataConstants.js'

export const fetchMinerData = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const id = state.auth.account.id
    const latestBlockHeight = state.networkData.latestBlock.height || 0
    const url = `${API_URL}worker/stats/${id}/${latestBlockHeight},${BLOCK_RANGE}/gps,height,valid_shares`
    const minerDataResponse = await fetch(url)
    const minerData = await minerDataResponse.json()
    dispatch({ type: 'MINER_DATA', data: { historical: minerData } })
  } catch (e) {
    console.log('Error: ', e)
  }
}

export const fetchMinerShares = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const id = state.auth.account.id
    const url = `${API_URL}worker/stat/${id}/total_valid_shares`
    const minerSharesResponse = await fetch(url)
    const minerShares = await minerSharesResponse.json()
    dispatch({ type: 'MINER_TOAL_VALID_SHARES', data: { totalSharesSubmitted: minerShares.total_valid_shares } })
  } catch (e) {
    console.log('Error: ', e)
  }
}

export const fetchMinerPaymentData = () => async (dispatch, getState) => {
  try {
    const state = getState()
    const id = state.auth.account.id
    const url = `${API_URL}worker/utxo/${id}`
    const minerPaymentResponse = await fetch(url)
    const minerPaymentData = await minerPaymentResponse.json()
    dispatch({ type: 'MINER_PAYMENT_DATA', data: minerPaymentData })
  } catch (e) {
    console.log('Error: ', e)
  }
}
