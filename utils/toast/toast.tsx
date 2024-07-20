import Icon from '@/components/ui/icon';
import { IconName } from '@/components/ui/icon/icons';
import { cn } from '@/lib/utils';
import { toast as rToast } from 'react-toastify';

type MessageParams = {
  title?: string | null;
  titleTx?: string;
  titleTxOptions?: any;
  message?: string | null;
  messageTx?: string;
  messageTxOptions?: any;
  severity?: 'info' | 'success' | 'error' | 'warning';
  action?: boolean;
  className?: string;
  autoClose?: number | false;
  closeOnClick?: boolean;
  elementAction?: React.ReactNode;
  icon?: React.ReactNode;
  show?: boolean;
};
export type NoticeType = 'info' | 'success' | 'error' | 'warning';

const ToastContent = ({
  closeToast,
  title,
  message,
  type,
  icon,
  elementAction,
  titleTx,
  titleTxOptions,
  messageTx,
  messageTxOptions
}: {
  closeToast?: () => void;
  title?: string | null;
  titleTx?: string;
  titleTxOptions?: object;
  message?: string | null;
  messageTx?: string;
  messageTxOptions?: any;
  type: NoticeType;
  icon?: React.ReactNode;
  elementAction?: React.ReactNode;
}) => {
  const renderIcon = () => {
    if (icon) {
      return icon;
    }

    return <Icon name={`toast-${type}` as IconName} />;
  };

  return (
    <div
      className={cn(
        'flex h-full gap-3 min-h-[3.375rem] z-max bg-white09 px-[18px] py-2.5 items-center mx-2 mb-2 md:mx-0 md:mb-0'
      )}
    >
      {renderIcon()}
      <div className="flex-1">
        <div className={cn('flex-1 flex  gap-4')}>
          <div className="flex flex-col justify-center flex-1 h-full">
            {(title || titleTx) && <h3>{title || titleTx}</h3>}
            {(message || messageTx) && <p>{message || messageTx}</p>}
          </div>
        </div>
        {elementAction}
      </div>
    </div>
  );
};

export const parseErrorMessage = (error: string) => {
  try {
    const obj = JSON.parse(error);

    return obj.message;
  } catch (error) {
    return error;
  }
};

class Toast {
  error(params: MessageParams) {
    if (params.message) {
      rToast(<ToastContent type="error" {...params} />, {
        autoClose: params.autoClose,
        closeOnClick: params.closeOnClick,
        className: params.className
      });
    }
  }

  warning(params: MessageParams) {
    rToast(<ToastContent type="warning" {...params} />, {
      autoClose: params.autoClose,
      closeOnClick: params.closeOnClick,
      className: params.className
    });
  }

  success(params: MessageParams) {
    rToast(<ToastContent type="success" {...params} />, {
      autoClose: params.autoClose,
      closeOnClick: params.closeOnClick,
      className: params.className
    });
  }

  info(params: MessageParams) {
    rToast(<ToastContent type="info" {...params} />, {
      autoClose: params.autoClose,
      closeOnClick: params.closeOnClick,
      className: params.className
    });
  }
}
const toast = new Toast();
export default toast;
