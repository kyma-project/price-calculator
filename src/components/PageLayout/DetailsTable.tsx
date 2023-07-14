import React from 'react';
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
            This Kyma Runtime Estimator is a free tool that provides an estimate
            of the pricing and required Capacity Units for SAP Business
            Technology Platform, Kyma Runtime and is based on the following
            assumptions:
          </Title>
        </TableColumn>
      }
    >
      <TableRow>
        <TableCell>
          A newly setup Kyma runtime without deployments typically reserves
          around 8vCPUs for the different components of Kyma.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Depending of the setup of your deployments, this can increase.
          Remaining resources can be consumed for custom workload.
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
          of Kyma Runtime may vary from the provided estimate.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          The 224GB of storage from the Kyma base setup can't be used for custom
          deployments.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Virtual Machines are restricted to up to 80 machines, which include
          the base configuration plus any additional, and is metered per hour.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          2 Storage Disks are required for Persistent Volume Claim from 33GB to
          64GB.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>EU Access is not available for the Cloud Service.</TableCell>
      </TableRow>
    </Table>
  );
}
