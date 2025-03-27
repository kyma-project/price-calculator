import React from 'react';
import config from '../../config.json';
import {
  Table,
  TableCell,
  TableRow,
  Title,
  TableHeaderRow,
  TableHeaderCell,
  Link,
} from '@ui5/webcomponents-react';
import './DetailsTable.css';

export default function DetailsTable() {
  return (
    <Table
      id="DetailsTable"
      waitForDefine={true}
      headerRow={
        <TableHeaderRow sticky>
          <TableHeaderCell>
            <Title level="H5" size="H5" wrappingType="Normal">
              This estimator is a free tool that provides an estimate of the
              pricing and required Capacity Units and {config.CurrencyCode} for
              SAP Business Technology Platform, Kyma runtime and is based on the
              following assumptions:
            </Title>
          </TableHeaderCell>
        </TableHeaderRow>
      }
    >
      <TableRow>
        <TableCell>
          Each single managed SAP BTP, Kyma runtime's module occupies in-cluster resources. See
          <Link
            id="module-sizing-like"
            design="Default"
            href="https://help.sap.com/docs/btp/sap-business-technology-platform/kyma-modules-sizing"
            target="_blank"
            rel="noreferrer"
          >
            Module Sizing
          </Link>
          for more info.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Costs are provided in Capacity Units. Use the conversion factor, which
          encapsulates your current discount (if any), in the Wizard to obtain
          the correct estimate in Euro.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          SAP BTP, Kyma runtime costs are metered hourly. Cost computation will start after the
          creation of the "Kyma Environment" is completed and the cluster
          accessible to the user.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          SAP BTP, Kyma runtime cost estimator provides costs per month. One month is 
          considered composed of {config.AdditionalConfig.TimeConsumption} hours.
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
          of SAP BTP, Kyma runtime may vary from the provided estimate.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Virtual Machines are restricted to up to 300 machines, which include
          the base configuration plus any additional, and they are metered on 
          hour basis.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          SAP BTP, Kyma runtime is provisioned with 32GB of storage dedicated to 
          operational data, which is provided at no additional cost. However, 
          certain SAP BTP, Kyma runtime's modules may require additional storage. 
          In such cases, they will create extra volumes, and you will incur 
          charges for the additional storage used.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          Storage block are provided in slots of 32GB. It means that 2 Storage Disks 
          are required for Persistent Volume Claim from 33GB to 64GB.
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell>
          EU Access Landscape is available for the Cloud Service at the same
          price.
        </TableCell>
      </TableRow>
    </Table>
  );
}
