/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/* global getAssetRegistry getFactory emit */

/**© Ratq Science & Tech
 * Sample transaction processor function.
 * @param {org.example.basic.SampleTransaction} tx The sample transaction instance.
 * @transaction
 */
async function sampleTransaction(tx) {  // eslint-disable-line no-unused-vars

    // Save the old value of the asset.
    //double oldValue = tx.fund.value;
    //const walletvalue = tx.wallet.value;
    
    // Update the asset with the new value.

    tx.donor.asset.balance-= tx.amount;
    tx.org.asset.balance+=tx.amount;
    tx.cause.balance+=tx.amount;
    // Get the asset registry for the asset.
   const assetRegistry = await getAssetRegistry('org.example.basic.SampleAsset');
    // Update the asset in the asset registry.
   await assetRegistry.update(tx.donor.asset);
  await assetRegistry.update(tx.org.asset);
  const causeRegistry = await getAssetRegistry('org.example.basic.FundForCause');
   await causeRegistry.update(tx.cause);
  


    // Emit an event for the modified asset.
    let event = getFactory().newEvent('org.example.basic', 'SampleEvent');
    event.donor = tx.donor
    event.receiver  = tx.org
    event.wallet = tx.donor.asset;
   event.fund = tx.org.asset;
    event.donorName = event.donor.firstName +" "+ event.donor.lastName;
    event.orgName = event.receiver.firstName +" "+ event.receiver.lastName;
    event.txnAmnt = tx.amount;
    event.donorBalance =event.wallet.balance;
  event.rcvrBalance=event.fund.balance;
   event.causeBalance = tx.cause.balance;
  event.requiredFund =  tx.cause.reqdFund
    emit(event);
}
