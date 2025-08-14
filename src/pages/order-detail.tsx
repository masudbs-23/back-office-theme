import { useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';

import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import Paper from '@mui/material/Paper';

import { DashboardContent } from 'src/layouts/dashboard';

import { Breadcrumb } from 'src/components/breadcrumb';
import { Iconify } from 'src/components/iconify';
import { Label } from 'src/components/label';

import { useRouter } from 'src/routes/hooks';

import { _orders } from 'src/_mock';

// ----------------------------------------------------------------------

export default function OrderDetailPage() {
  const router = useRouter();
  const { id } = useParams();
  
  const order = _orders.find((order) => order.id === id);
  
  const [status, setStatus] = useState(order?.status || 'pending');
  const [notes, setNotes] = useState(order?.notes || '');

  if (!order) {
    return (
      <DashboardContent>
        <Typography variant="h6">Order not found</Typography>
      </DashboardContent>
    );
  }

  const handleStatusChange = useCallback((event: any) => {
    setStatus(event.target.value);
    // Here you would typically make an API call to update the order status
    console.log(`Order ${order.orderNumber} status changed to ${event.target.value}`);
  }, [order.orderNumber]);

  const handleNotesChange = useCallback((event: any) => {
    setNotes(event.target.value);
    // Here you would typically make an API call to update the order notes
    console.log(`Order ${order.orderNumber} notes updated`);
  }, [order.orderNumber]);

  const handleSaveChanges = useCallback(() => {
    // Here you would typically make an API call to save all changes
    console.log('Saving changes for order:', order.orderNumber);
    // You can add a success notification here
  }, [order.orderNumber]);

  const handleBack = useCallback(() => {
    router.push('/dashboard/orders');
  }, [router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'warning';
      case 'pickup':
        return 'info';
      case 'delivered':
        return 'success';
      default:
        return 'default';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending':
        return 'Pending';
      case 'pickup':
        return 'Pickup';
      case 'delivered':
        return 'Delivered';
      default:
        return status;
    }
  };

  const getPaymentColor = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return 'success';
      case 'pending':
        return 'warning';
      case 'failed':
        return 'error';
      default:
        return 'default';
    }
  };

  const getPaymentLabel = (paymentStatus: string) => {
    switch (paymentStatus) {
      case 'paid':
        return 'Paid';
      case 'pending':
        return 'Pending';
      case 'failed':
        return 'Failed';
      default:
        return paymentStatus;
    }
  };

  return (
    <DashboardContent>
      <Breadcrumb 
        title={`Order ${order.orderNumber}`}
        items={[
          { title: 'Dashboard', href: '/dashboard' },
          { title: 'Orders', href: '/dashboard/orders' },
          { title: order.orderNumber }
        ]} 
      />

      <Box sx={{ mb: 3 }}>
        <Button
          variant="outlined"
          startIcon={<Iconify icon="eva:arrow-back-fill" />}
          onClick={handleBack}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: '#FFFFFF',
            '&:hover': {
              backgroundColor: '#f5f5f5',
            },
          }}
        >
          Back
        </Button>
      </Box>

      <Card
        sx={{
          p: 4,
          border: '1px solid',
          borderColor: 'divider',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
          backgroundColor: '#FFFFFF',
          borderRadius: 3,
        }}
      >
        {/* Order Header */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: 'text.primary' }}>
              {order.orderNumber}
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontSize: '1rem' }}>
              Placed on {new Date(order.orderDate).toLocaleDateString()}
            </Typography>
          </Box>
          <Stack direction="row" spacing={2} alignItems="center">
            <Label
              variant="soft"
              color={getStatusColor(status)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              {getStatusLabel(status)}
            </Label>
            <Label
              variant="soft"
              color={getPaymentColor(order.paymentStatus)}
              sx={{
                textTransform: 'capitalize',
                fontWeight: 600,
                fontSize: '0.875rem',
                px: 3,
                py: 1,
                borderRadius: 2,
              }}
            >
              {getPaymentLabel(order.paymentStatus)}
            </Label>
          </Stack>
        </Stack>

        <Divider sx={{ mb: 4 }} />

        {/* Customer Information */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          Customer Information
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <TextField
              fullWidth
              label="Customer Name"
              value={order.customerName}
              InputProps={{ readOnly: true }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8fafc',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Email"
              value={order.customerEmail}
              InputProps={{ readOnly: true }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8fafc',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Phone"
              value={order.customerPhone}
              InputProps={{ readOnly: true }}
              sx={{ 
                mb: 3,
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8fafc',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
            />
            <TextField
              fullWidth
              label="Address"
              value={order.customerAddress}
              InputProps={{ readOnly: true }}
              multiline
              rows={4}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8fafc',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
            />
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Order Items */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          Order Items
        </Typography>
        <Box sx={{ mb: 4 }}>
          {order.items.map((item, index) => (
            <Paper
              key={item.id}
              elevation={0}
              sx={{
                p: 3,
                mb: 2,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#fafafa',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#f5f5f5',
                  transition: 'background-color 0.2s ease',
                },
              }}
            >
              <Stack direction="row" spacing={3} alignItems="center">
                <Box
                  component="img"
                  src={item.image}
                  sx={{
                    width: 80,
                    height: 80,
                    borderRadius: 2,
                    objectFit: 'cover',
                    border: '1px solid',
                    borderColor: 'divider',
                  }}
                />
                <Box sx={{ flex: 1 }}>
                  <Typography variant="h6" sx={{ fontWeight: 600, mb: 1 }}>
                    {item.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1 }}>
                    Quantity: {item.quantity}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Price per item: ${item.price.toFixed(2)}
                  </Typography>
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Stack>
            </Paper>
          ))}
        </Box>

        {/* Order Summary */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          Order Summary
        </Typography>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Order Details
              </Typography>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Subtotal:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${order.subtotal.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Shipping:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${order.shipping.toFixed(2)}
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="body1">Tax:</Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    ${order.tax.toFixed(2)}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'text.primary' }}>
                    Total:
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 700, color: 'primary.main' }}>
                    ${order.total.toFixed(2)}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                p: 3,
                border: '1px solid',
                borderColor: 'divider',
                backgroundColor: '#FFFFFF',
                borderRadius: 2,
                height: '100%',
              }}
            >
              <Typography variant="h6" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
                Payment & Delivery
              </Typography>
              <Stack spacing={2}>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Payment Method
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {order.paymentMethod}
                  </Typography>
                </Box>
                {order.trackingNumber && (
                  <Box>
                    <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                      Tracking Number
                    </Typography>
                    <Typography variant="body1" sx={{ fontWeight: 500 }}>
                      {order.trackingNumber}
                    </Typography>
                  </Box>
                )}
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {order.estimatedDelivery}
                  </Typography>
                </Box>
                <Box>
                  <Typography variant="body2" sx={{ color: 'text.secondary', mb: 0.5 }}>
                    Order Date
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    {new Date(order.orderDate).toLocaleDateString()}
                  </Typography>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>

        <Divider sx={{ mb: 4 }} />

        {/* Order Management */}
        <Typography variant="h5" sx={{ mb: 3, fontWeight: 600, color: 'text.primary' }}>
          Order Management
        </Typography>
        <Stack spacing={3} sx={{ mb: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Status</InputLabel>
            <Select
              value={status}
              label="Status"
              onChange={handleStatusChange}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8fafc',
                  '& fieldset': {
                    borderColor: 'divider',
                  },
                },
              }}
            >
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="pickup">Pickup</MenuItem>
              <MenuItem value="delivered">Delivered</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            label="Notes"
            value={notes}
            onChange={handleNotesChange}
            multiline
            rows={3}
            placeholder="Add order notes..."
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8fafc',
                '& fieldset': {
                  borderColor: 'divider',
                },
              },
            }}
          />
        </Stack>

        {/* Save Changes Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSaveChanges}
            sx={{
              px: 4,
              py: 1.5,
              fontWeight: 600,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Save Changes
          </Button>
        </Box>
      </Card>
    </DashboardContent>
  );
}
