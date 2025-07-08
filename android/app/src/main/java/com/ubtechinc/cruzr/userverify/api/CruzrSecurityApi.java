package com.ubtechinc.cruzr.userverify.api;

import android.annotation.SuppressLint;
import android.content.ComponentName;
import android.content.Context;
import android.content.Intent;
import android.content.ServiceConnection;
import android.os.Bundle;
import android.os.Handler;
import android.os.IBinder;
import android.os.Message;
import android.os.Messenger;
import android.os.RemoteException;
import android.util.Log;

import androidx.core.app.NotificationCompat;

import com.ubtechinc.cruzr.userverify.aidl.Security;

public class CruzrSecurityApi implements ServiceConnection {
    protected static final String AIDL_PATH = "com.ubtechinc.cruzr.userverify.aidl";
    private static final int BIND_CODE = 1;
    public static final int FACE_VERIFY = 1;
    public static final int FACE_VERIFY_FAIL = 2;
    public static final int MODE_CHANGE_CODE_ADMINI = 3;
    public static final int MODE_CHANGE_CODE_SUPER_ADMINI = 4;
    public static final int MODE_CHANGE_CODE_VISITOR = 2;
    public static final int PASSWORD_VERIFY = 0;
    protected static final String SERVICE_ACTION = "com.ubt.cruzr.action.security";
    protected static final String SERVICE_PACKAGE = "com.ubtechinc.settings";
    protected static final String TAG = "UserSecurityService";
    private static CruzrSecurityApi mApi;
    private ServiceConnection conn = new ServiceConnection() {
        public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
            Log.i(CruzrSecurityApi.TAG, "onServiceConnected: ");
            CruzrSecurityApi.this.mServerMessenger = new Messenger(iBinder);
            Message obtain = Message.obtain();
            obtain.what = 1;
            Bundle bundle = new Bundle();
            bundle.putString(NotificationCompat.CATEGORY_MESSAGE, CruzrSecurityApi.this.mContext.getPackageName());
            obtain.setData(bundle);
            obtain.replyTo = CruzrSecurityApi.this.mMessenger;
            try {
                CruzrSecurityApi.this.mServerMessenger.send(obtain);
            } catch (RemoteException e) {
                e.printStackTrace();
                if (CruzrSecurityApi.this.mCallBackListener != null) {
                    CruzrSecurityApi.this.mCallBackListener.onBindfail();
                }
            }
        }

        public void onServiceDisconnected(ComponentName componentName) {
            Log.i(CruzrSecurityApi.TAG, "onServiceDisconnected: ");
            if (CruzrSecurityApi.this.mCallBackListener != null) {
                CruzrSecurityApi.this.mCallBackListener.onDisconnect();
            }
            CruzrSecurityApi.this.isConnectCallBack = false;
            CruzrSecurityApi.this.mHandler.postDelayed(CruzrSecurityApi.this.reconnectRun, 5000);
        }
    };
    /* access modifiers changed from: private */
    public boolean isConnectApi = false;
    /* access modifiers changed from: private */
    public boolean isConnectCallBack = false;
    /* access modifiers changed from: private */
    public ISecurityCallBack mCallBackListener;
    /* access modifiers changed from: private */
    public Context mContext;
    /* access modifiers changed from: private */
    @SuppressLint("HandlerLeak")
    public Handler mHandler = new Handler() {
        public void handleMessage(Message message) {
            switch (message.what) {
                case 1:
                    CruzrSecurityApi.this.isConnectCallBack = true;
                    if (CruzrSecurityApi.this.mCallBackListener != null) {
                        CruzrSecurityApi.this.mCallBackListener.onBindSuccess();
                        return;
                    }
                    return;
                case 2:
                    if (CruzrSecurityApi.this.mCallBackListener != null) {
                        CruzrSecurityApi.this.mCallBackListener.securityModeChange(2);
                        return;
                    }
                    return;
                case 3:
                    if (CruzrSecurityApi.this.mCallBackListener != null) {
                        CruzrSecurityApi.this.mCallBackListener.securityModeChange(3);
                        return;
                    }
                    return;
                case 4:
                    if (CruzrSecurityApi.this.mCallBackListener != null) {
                        CruzrSecurityApi.this.mCallBackListener.securityModeChange(4);
                        return;
                    }
                    return;
                default:
                    if (CruzrSecurityApi.this.mCallBackListener != null) {
                        CruzrSecurityApi.this.mCallBackListener.onBindfail();
                        return;
                    }
                    return;
            }
        }
    };
    /* access modifiers changed from: private */
    public Messenger mMessenger = new Messenger(this.mHandler);
    private Security mSecurity;
    /* access modifiers changed from: private */
    public Messenger mServerMessenger;
    /* access modifiers changed from: private */
    public Runnable reconnectRun = new Runnable() {
        public void run() {
            if (!CruzrSecurityApi.this.isConnectApi || !CruzrSecurityApi.this.isConnectCallBack) {
                Log.e("rqh", "rqh cruzrSecurityApi reconnectRun");
                CruzrSecurityApi.this.init(CruzrSecurityApi.this.mContext, CruzrSecurityApi.this.mCallBackListener);
                CruzrSecurityApi.this.mHandler.postDelayed(CruzrSecurityApi.this.reconnectRun, 3000);
                return;
            }
            CruzrSecurityApi.this.mHandler.removeCallbacks(CruzrSecurityApi.this.reconnectRun);
        }
    };

    public CruzrSecurityApi() {
    }

    public static CruzrSecurityApi get() {
        if (mApi == null) {
            synchronized (CruzrSecurityApi.class) {
                if (mApi == null) {
                    mApi = new CruzrSecurityApi();
                }
            }
        }
        return mApi;
    }

    public CruzrSecurityApi(Context context, ISecurityCallBack iSecurityCallBack) {
        this.mContext = context;
        this.mCallBackListener = iSecurityCallBack;
        if (context != null) {
            Intent intent = new Intent(SERVICE_ACTION);
            intent.setPackage("com.ubtechinc.settings");
            context.bindService(intent, this.conn, Context.BIND_AUTO_CREATE);
            Intent intent2 = new Intent(AIDL_PATH);
            intent2.setPackage("com.ubtechinc.settings");
            context.bindService(intent2, this, Context.BIND_AUTO_CREATE);
        }
    }

    public void init(Context context, ISecurityCallBack iSecurityCallBack) {
        this.mContext = context;
        this.mCallBackListener = iSecurityCallBack;
        if (context != null) {
            Intent intent = new Intent(SERVICE_ACTION);
            intent.setPackage("com.ubtechinc.settings");
            context.bindService(intent, this.conn, Context.BIND_AUTO_CREATE);
            Intent intent2 = new Intent(AIDL_PATH);
            intent2.setPackage("com.ubtechinc.settings");
            context.bindService(intent2, this, Context.BIND_AUTO_CREATE);
        }
    }

    public void unbindService() {
        this.mContext.unbindService(this.conn);
        this.mContext.unbindService(this);
    }

    public int getAdminiMode() {
        try {
            if (this.mSecurity != null) {
                return this.mSecurity.getAdminiMode();
            }
            return 2;
        } catch (RemoteException e) {
            e.printStackTrace();
            return 2;
        }
    }

    public void setModel(String str, int i, long j) {
        try {
            if (this.mSecurity != null) {
                this.mSecurity.setModel(str, i, j);
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
    }

    public boolean changeVerifyMode(int i) {
        try {
            if (this.mSecurity == null) {
                return true;
            }
            this.mSecurity.changeVerifyMode(this.mContext.getPackageName(), i);
            return true;
        } catch (RemoteException e) {
            e.printStackTrace();
            return false;
        }
    }

    public boolean exitAdmini() {
        try {
            if (this.mSecurity != null) {
                return this.mSecurity.exitAdmini();
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    public long getAdminiUserID() {
        try {
            if (this.mSecurity != null) {
                return this.mSecurity.getAdminiUserID();
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return -1;
    }

    public String getPassword() {
        try {
            if (this.mSecurity != null) {
                return this.mSecurity.getPassword();
            }
            return null;
        } catch (RemoteException e) {
            e.printStackTrace();
            return "";
        }
    }

    private boolean changePassword(String str) {
        try {
            if (this.mSecurity != null) {
                return this.mSecurity.setPassword(str);
            }
        } catch (RemoteException e) {
            e.printStackTrace();
        }
        return false;
    }

    public void onServiceConnected(ComponentName componentName, IBinder iBinder) {
        this.mSecurity = Security.Stub.asInterface(iBinder);
        this.isConnectApi = true;
    }

    public void onServiceDisconnected(ComponentName componentName) {
        this.isConnectApi = false;
        this.mHandler.postDelayed(this.reconnectRun, 3000);
    }
}
