import React from 'react';
import config from '../../config.json';
import {
  Table,
  TableColumn,
  TableCell,
  TableRow,
  Title,
} from '@ui5/webcomponents-react';
import './DetailsTable.css';

export default function DetailsTable() {
  return (
    <Table
      id="DetailsTable"
      waitForDefine={true}
      columns={
        <TableColumn style={{ backgroundColor: 'rgb(226, 243, 255)' }}>
          <Title level="H5" wrappingType="Normal">
            This estimator is a free tool that provides an estimate
            of the pricing and required Capacity Units and {config.CurrencyCode} for SAP Business
            Technology Platform, Kyma runtime and is based on the following
            assumptions:
          </Title>
        </TableColumn>
      }
    >
      <TableRow>
        <TableCell>
          Each single managed Kyma module occupy in-cluster resources. See <a href="https://help.sap.com/docs/btp/sap-business-technology-platform/kyma-modules-sizing" target="_blank" rel="noreferrer">Module Sizing</a> for more info.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Costs are provided in Capacity Units. Use the conversion factor, which incapsulate your current discount (if any), in the Wizard to obtain the correct estimate in Euro.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Kyma costs are metered hourly. Cost computation will start after the creation of the "Kyma Environment" is completed and the cluster accessible to the user.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          The increase of consumption is depending on various factors, e.g. (not
          limited to): number of deployments, number of connected systems,
          complexity of deployments, traffic via the API Gateway.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          The pricing and actual Capacity Units required for your specific use
          of Kyma runtime may vary from the provided estimate.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Virtual Machines are restricted to up to 300 machines, which include
          the base configuration plus any additional, and is metered per hour.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          The 224GB of storage from the Kyma runtime base setup can't be used for custom
          deployments.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          2 Storage Disks are required for Persistent Volume Claim from 33GB to
          64GB.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>EU Access Landscape is available for the Cloud Service at the same price.</TableCell>
      </TableRow>
    </Table>
  );
}
