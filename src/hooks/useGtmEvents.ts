import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { pushToDataLayer } from "../lib/gtm";

type GTMEventData = Record<string, any>;

export const useGtmEvents = () => {
  const location = useLocation();

  // 🔹 PAGE VIEW
  useEffect(() => {
    const url = location.pathname + location.search;

    console.log("📄 GTM page_view:", url);

    pushToDataLayer("page_view", {
      page_path: url,
    });
  }, [location]);

  // 🔹 Generic
  const trackEvent = (event: string, data?: GTMEventData) => {
    console.log(`📊 GTM Event: ${event}`, data);

    pushToDataLayer(event, data);
  };

  // 🔹 VIEW ITEM
  const trackContentView = (product: {
    id: string;
    name?: string;
    price?: number;
  }) => {
    trackEvent("view_item", {
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
          },
        ],
      },
    });
  };

  // 🔹 ADD TO CART
  const trackAddToCart = (product: {
    id: string;
    name: string;
    price: number;
    quantity?: number;
  }) => {
    trackEvent("add_to_cart", {
      ecommerce: {
        items: [
          {
            item_id: product.id,
            item_name: product.name,
            price: product.price,
            quantity: product.quantity || 1,
          },
        ],
      },
    });
  };

  // 🔹 BEGIN CHECKOUT
  const trackInitialCheckout = (cart: {
    total: number;
    items: any[];
  }) => {
    trackEvent("begin_checkout", {
      ecommerce: {
        value: cart.total,
        currency: "BDT",
        items: cart.items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    });
  };

  // 🔹 ✅ PURCHASE (FINAL – GA4 CORRECT)
  const trackPurchase = (order: {
    order_id: string;
    value: number;
    currency?: string;
    items: any[];
    customer_name: string;
    phone_number: string;
    delivery_area: string;
  }) => {
    const payload = {
      ecommerce: {
        transaction_id: order.order_id,
        value: order.value,
        currency: order.currency || "BDT",
        items: order.items.map((item) => ({
          item_id: item.id,
          item_name: item.name,
          price: item.price,
          quantity: item.quantity,
        })),
      },
      customer_name: order.customer_name,
      phone_number: order.phone_number,
      delivery_area: order.delivery_area,
    };

    console.log("💰 GTM PURCHASE EVENT:", payload);

    pushToDataLayer("purchase", payload);
  };

  return {
    trackEvent,
    trackContentView,
    trackAddToCart,
    trackInitialCheckout,
    trackPurchase,
  };
};

// import { useEffect } from "react";
// import { useLocation } from "react-router-dom";
// import { pushToDataLayer } from "../lib/gtm";

// type GTMEventData = Record<string, any>;

// export const useGtmEvents = () => {
//   const location = useLocation();

//   // 🔹 Auto track page views
//   useEffect(() => {
//     const url = location.pathname + location.search;
//     pushToDataLayer("page_view", { page_path: url });
//   }, [location]);

//   // 🔹 Generic event tracker
//   const trackEvent = (event: string, data?: GTMEventData) => {
//     pushToDataLayer(event, data);
//   };

//   // 🔹 Specific event shortcuts
// const trackContentView = (content: { id: string; title?: string; price?: number }) => {
//   trackEvent("view_item", {
//     content_id: content.id,
//     content_title: content.title,
//     price: content.price,
//   });
// };


//   const trackAddToCart = (product: {
//     id: string;
//     name: string;
//     price: number;
//     quantity?: number;
//   }) => {
//     trackEvent("add_to_cart", {
//       product_id: product.id,
//       product_name: product.name,
//       price: product.price,
//       quantity: product.quantity || 1,
//     });
//   };

//   const trackInitialCheckout = (cartData: { total: number; items: any[] }) => {
//     trackEvent("initial_checkout", {
//       value: cartData.total,
//       items: cartData.items,
//     });
//   };

//   const trackPurchase = (order: {
//     order_id: string;
//     value: number;
//     currency?: string;

//     customer_name: string;
//     phone_number: string;
//     delivery_area: string;
//     items: any[];
//   }) => {
//     trackEvent("purchase", {
//       transaction_id: order.order_id,
//       value: order.value,
//       currency: order.currency || "BDT",
//       items: order.items,
//       customer_name: order.customer_name,
//       phone_number: order.phone_number,
//       delivery_area: order.delivery_area,
//     });
//   };

//   return {
//     trackEvent,
//     trackContentView,
//     trackAddToCart,
//     trackInitialCheckout,
//     trackPurchase,
//   };
// };
