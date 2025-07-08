package com.ubtechinc.cruzr.userverify.aidl;

import android.os.Binder;
import android.os.IBinder;
import android.os.IInterface;
import android.os.Parcel;
import android.os.RemoteException;

public interface Security extends IInterface {
    void changeVerifyMode(String str, int i) throws RemoteException;

    boolean exitAdmini() throws RemoteException;

    int getAdminiMode() throws RemoteException;

    long getAdminiUserID() throws RemoteException;

    String getPassword() throws RemoteException;

    void setModel(String str, int i, long j) throws RemoteException;

    boolean setPassword(String str) throws RemoteException;

    public static abstract class Stub extends Binder implements Security {
        private static final String DESCRIPTOR = "com.ubtechinc.cruzr.userverify.aidl.Security";
        static final int TRANSACTION_changeVerifyMode = 7;
        static final int TRANSACTION_exitAdmini = 3;
        static final int TRANSACTION_getAdminiMode = 2;
        static final int TRANSACTION_getAdminiUserID = 1;
        static final int TRANSACTION_getPassword = 5;
        static final int TRANSACTION_setModel = 6;
        static final int TRANSACTION_setPassword = 4;

        public IBinder asBinder() {
            return this;
        }

        public Stub() {
            attachInterface(this, DESCRIPTOR);
        }

        public static Security asInterface(IBinder iBinder) {
            if (iBinder == null) {
                return null;
            }
            IInterface queryLocalInterface = iBinder.queryLocalInterface(DESCRIPTOR);
            if (queryLocalInterface == null || !(queryLocalInterface instanceof Security)) {
                return new Proxy(iBinder);
            }
            return (Security) queryLocalInterface;
        }

        public boolean onTransact(int i, Parcel parcel, Parcel parcel2, int i2) throws RemoteException {
            if (i != 1598968902) {
                switch (i) {
                    case 1:
                        parcel.enforceInterface(DESCRIPTOR);
                        long adminiUserID = getAdminiUserID();
                        parcel2.writeNoException();
                        parcel2.writeLong(adminiUserID);
                        return true;
                    case 2:
                        parcel.enforceInterface(DESCRIPTOR);
                        int adminiMode = getAdminiMode();
                        parcel2.writeNoException();
                        parcel2.writeInt(adminiMode);
                        return true;
                    case 3:
                        parcel.enforceInterface(DESCRIPTOR);
                        boolean exitAdmini = exitAdmini();
                        parcel2.writeNoException();
                        parcel2.writeInt(exitAdmini ? 1 : 0);
                        return true;
                    case 4:
                        parcel.enforceInterface(DESCRIPTOR);
                        boolean password = setPassword(parcel.readString());
                        parcel2.writeNoException();
                        parcel2.writeInt(password ? 1 : 0);
                        return true;
                    case 5:
                        parcel.enforceInterface(DESCRIPTOR);
                        String password2 = getPassword();
                        parcel2.writeNoException();
                        parcel2.writeString(password2);
                        return true;
                    case 6:
                        parcel.enforceInterface(DESCRIPTOR);
                        setModel(parcel.readString(), parcel.readInt(), parcel.readLong());
                        parcel2.writeNoException();
                        return true;
                    case 7:
                        parcel.enforceInterface(DESCRIPTOR);
                        changeVerifyMode(parcel.readString(), parcel.readInt());
                        parcel2.writeNoException();
                        return true;
                    default:
                        return super.onTransact(i, parcel, parcel2, i2);
                }
            } else {
                parcel2.writeString(DESCRIPTOR);
                return true;
            }
        }

        private static class Proxy implements Security {
            private IBinder mRemote;

            public String getInterfaceDescriptor() {
                return Stub.DESCRIPTOR;
            }

            Proxy(IBinder iBinder) {
                this.mRemote = iBinder;
            }

            public IBinder asBinder() {
                return this.mRemote;
            }

            public long getAdminiUserID() throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    this.mRemote.transact(1, obtain, obtain2, 0);
                    obtain2.readException();
                    return obtain2.readLong();
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public int getAdminiMode() throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    this.mRemote.transact(2, obtain, obtain2, 0);
                    obtain2.readException();
                    return obtain2.readInt();
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public boolean exitAdmini() throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    boolean z = false;
                    this.mRemote.transact(3, obtain, obtain2, 0);
                    obtain2.readException();
                    if (obtain2.readInt() != 0) {
                        z = true;
                    }
                    return z;
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public boolean setPassword(String str) throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    obtain.writeString(str);
                    boolean z = false;
                    this.mRemote.transact(4, obtain, obtain2, 0);
                    obtain2.readException();
                    if (obtain2.readInt() != 0) {
                        z = true;
                    }
                    return z;
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public String getPassword() throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    this.mRemote.transact(5, obtain, obtain2, 0);
                    obtain2.readException();
                    return obtain2.readString();
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public void setModel(String str, int i, long j) throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    obtain.writeString(str);
                    obtain.writeInt(i);
                    obtain.writeLong(j);
                    this.mRemote.transact(6, obtain, obtain2, 0);
                    obtain2.readException();
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }

            public void changeVerifyMode(String str, int i) throws RemoteException {
                Parcel obtain = Parcel.obtain();
                Parcel obtain2 = Parcel.obtain();
                try {
                    obtain.writeInterfaceToken(Stub.DESCRIPTOR);
                    obtain.writeString(str);
                    obtain.writeInt(i);
                    this.mRemote.transact(7, obtain, obtain2, 0);
                    obtain2.readException();
                } finally {
                    obtain2.recycle();
                    obtain.recycle();
                }
            }
        }
    }
}
